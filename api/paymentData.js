import { clientCredentials } from '../utils/client';

const getAllPayments = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/payments`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getPaymentsById = (id) => fetch(`http://localhost:8000/payments/${id}`)
  .then((response) => response.json());

const createPayment = (payment) => new Promise((resolve, reject) => {
  fetch('http://localhost:8000/payments', {
    method: 'POST',
    body: JSON.stringify(payment),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch(reject);
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

export {
  getAllPayments, getPaymentsById, createPayment, updatePayment, deleteThisPayment,
};
