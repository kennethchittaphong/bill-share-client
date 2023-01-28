import { clientCredentials } from '../utils/client';

const getBills = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET SINGLE BILL
const getSingleBill = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills/${id}`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE BILL
const createBill = (bill) => new Promise((resolve, reject) => {
  const billObj = {
    bill_name: bill.name,
    due_date: bill.dueDate,
    total_amount: bill.totalAmount,
    split_amount: bill.splitAmount,
    status: bill.status,
  };
  fetch(`${clientCredentials.databaseURL}/bills`, {
    method: 'POST',
    body: JSON.stringify(billObj),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

// UPDATE BILL
const updateBill = (billObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills/${billObj.firebaseKey}.json`, billObj)
    .then(() => getBills(billObj.uid).then(resolve))
    .catch(reject);
});

// DELETE BILL
// eslint-disable-next-line no-unused-vars
const deleteBill = (firebaseKey, billId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills/${firebaseKey}.json`)
    .then(() => {
      getBills().then((billsArr) => resolve(billsArr));
    })
    .catch((error) => reject(error));
});

// const getBillPeoples = (id) => fetch(`${clientCredentials.databaseURL}/peoples/${id}`).then((response) => (response.data ? Object.values(response.data) : []));
const getBillPeoples = (id) => fetch(`${clientCredentials.databaseURL}/peoples/${id}`).then((response) => response.json()).then((res) => res);

export {
  deleteBill, updateBill, createBill, getBills, getSingleBill, getBillPeoples,
};
