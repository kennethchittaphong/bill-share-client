import { deleteBill, getBillPeoples } from './billData';
import { deleteSinglePeoples, getSinglePeoples } from './peopleData';

const getBillAndPeople = (bill) => new Promise((resolve, reject) => {
  getBillPeoples(bill)
    .then((billObj) => {
      getBillAndPeople(billObj).then((peopleObj) => {
        resolve({ peopleObj, ...billObj });
      });
    })
    .catch((error) => reject(error));
});

const getBillWithPeople = (billId) => new Promise((resolve, reject) => {
  Promise.all([getSinglePeoples(billId), getBillPeoples(billId)])
    .then(([billObj, billPeoplesArr]) => {
      resolve({ ...billObj, peoples: billPeoplesArr });
    })
    .catch((error) => reject(error));
});

const deleteBillPeoples = (billId) => new Promise((resolve, reject) => {
  getBillPeoples(billId)
    .then((peoplesArray) => {
      const deletePeoplesPromises = peoplesArray.map((people) => deleteSinglePeoples(people.id));
      Promise.all(deletePeoplesPromises).then(() => {
        deleteSinglePeoples(billId).then(resolve);
      });

      // delete bill api
      // eslint-disable-next-line no-console
      deleteBill(billId).then((res) => console.log('delete bill ===', res)).catch((err) => console.log('delete bill error ===', err));
    }).catch((error) => reject(error));
});
export { getBillAndPeople, getBillWithPeople as viewBillDetails, deleteBillPeoples };
