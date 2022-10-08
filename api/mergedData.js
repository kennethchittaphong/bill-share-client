import { getBillPeoples, deleteBill } from './billData';
import { deleteSinglePeoples, getSinglePeoples } from './peopleData';

const getBillAndPeople = (billFirebaseKey) => new Promise((resolve, reject) => {
  getBillPeoples(billFirebaseKey)
    .then((billObj) => {
      getBillAndPeople(billObj.firebaseKey).then((peopleObj) => {
        resolve({ peopleObj, ...billObj });
      });
    })
    .catch((error) => reject(error));
});

const getBillWithPeople = (billFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSinglePeoples(billFirebaseKey), getBillPeoples(billFirebaseKey)])
    .then(([billObj, billPeoplesArr]) => {
      resolve({ ...billObj, peoples: billPeoplesArr });
    })
    .catch((error) => reject(error));
});

const deleteBillPeoples = (billId) => new Promise((resolve, reject) => {
  getBillPeoples(billId)
    .then((peoplesArray) => {
      const deletePeoplePromises = peoplesArray.map((people) => deleteSinglePeoples(people.firebaseKey));

      Promise.all(deletePeoplePromises).then(() => {
        deleteBill(billId).then(resolve);
      });
    })
    .catch((error) => reject(error));
});
export { getBillAndPeople, getBillWithPeople as viewBillDetails, deleteBillPeoples };
