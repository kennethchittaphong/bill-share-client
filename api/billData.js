import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBills = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// GET SINGLE BILL
const getSingleBill = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills/${id}`)
    .then((response) => response.json()).then((data) => resolve(data))
    .catch(reject);
});

// CREATE BILL
const createBill = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/bills`, {
    method: 'POST',
    body: JSON.stringify({
      uid: payload.uid,
      name: payload.name,
      total_amount: payload.total_amount,
      due_date: payload.due_date,
      split_amount: payload.splitValues,
      status: payload.status,
      user: payload.user,
    }),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

// UPDATE BILL
const updateBill = (billObj) => fetch(`http://localhost:8000/bills/${billObj.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(billObj),
})
  .then((response) => response.json())
  .then((data) => {
    console.warn('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// DELETE BILL
const deleteBill = (billId) => new Promise((resolve, reject) => {
  fetch(`${dbUrl}/bills/${billId}`, {
    method: 'DELETE',
  }).then(resolve).catch(reject);
});

const getBillPeoples = (billId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples?billId=${billId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  deleteBill, updateBill, createBill, getBills, getSingleBill, getBillPeoples,
};
