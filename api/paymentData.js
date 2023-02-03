import { clientCredentials } from '../utils/client';

const getAllPayments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/payments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPaymentsById = (id) => fetch(`http://localhost:8000/payments/${id}`)
  .then((response) => response.json());

const createPayment = (billId) => fetch(`${clientCredentials.databaseURL}/payments`, {
  method: 'POST',
  body: JSON.stringify(billId),
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((resp) => resp.json())
  .catch((error) => {
    console.error('Error:', error);
  });

const updatePayment = (payment) => fetch(`http://localhost:8000/payments/${payment.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.warn('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

const deleteThisPayment = (id) => fetch(`http://localhost:8000/payments/${id}`, {
  method: 'DELETE',
});

const getBillPayment = (billId) => new Promise((resolve, reject) => {
  // eslint-disable-next-line no-unused-expressions
  billId && fetch(`${clientCredentials.databaseURL}/payments?billId=${billId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getAllPayments, getPaymentsById, createPayment, updatePayment, deleteThisPayment, getBillPayment,
};
