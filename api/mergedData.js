import { deleteBill, getBillPeoples } from './billData';

const deleteBillAndPeoples = (billId) => new Promise((resolve, reject) => {
  getBillPeoples(billId).then((billPeoplesArray) => {
    const deletePeoplesPromises = billPeoplesArray.map((billPeople) => deleteBill(billPeople.firebaseKey));

    Promise.all(deletePeoplesPromises).then(() => {
      deleteBill(billId).then(resolve);
    });
  })
    .catch(reject);
});

export default deleteBillAndPeoples;
