import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getBills = (uid) => axios.get(`${dbUrl}/bills.json?orderBy="uid"&equalTo="${uid}"`).then((response) => (response.data ? Object.values(response.data) : []));

// GET SINGLE BILL
const getSingleBill = (firebaseKey) => new Promise((resolve, reject) => {
  axios
    .get(`${dbUrl}/bills/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch(reject);
});

// CREATE BILL
const createBill = (newBillObj) => new Promise((resolve, reject) => {
  axios
    .post(`${dbUrl}/bills.json`, newBillObj)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/bills/${response.data.name}.json`, body).then(() => {
        getBills(newBillObj.uid).then(resolve);
      });
    })
    .catch(reject);
});

// UPDATE BILL
const updateBill = (billObj) => new Promise((resolve, reject) => {
  axios
    .patch(`${dbUrl}/bills/${billObj.firebaseKey}.json`, billObj)
    .then(() => getBills(billObj.uid).then(resolve))
    .catch(reject);
});

// DELETE BILL
// eslint-disable-next-line no-unused-vars
const deleteBill = (firebaseKey, billId) => new Promise((resolve, reject) => {
  axios
    .delete(`${dbUrl}/bills/${firebaseKey}.json`)
    .then(() => {
      getBills().then((billsArr) => resolve(billsArr));
    })
    .catch((error) => reject(error));
});

const getBillPeoples = (firebaseKey) => axios.get(`${dbUrl}/people.json?orderBy="billId"&equalTo="${firebaseKey}"`).then((response) => (response.data ? Object.values(response.data) : []));

export {
  deleteBill, updateBill, createBill, getBills, getSingleBill, getBillPeoples,
};
