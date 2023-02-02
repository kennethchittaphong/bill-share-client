import { clientCredentials } from '../utils/client';

const getPeoples = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSinglePeoples = (id) => fetch(`http://localhost:8000/peoples/${id}`, {
  method: 'DELETE',
});

// CREATE People
const createPeoples = (billId) => fetch(`${clientCredentials.databaseURL}/peoples`, {
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

// UPDATE People
const updatePeoples = (people) => fetch(`http://localhost:8000/peoples/${people.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify(people),
})
  .then((response) => response.json())
  .then((data) => {
    console.warn('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// GET Single People
const getSinglePeoples = (billId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples/${billId}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        billId: data.bill_id,
        name: data.name,
        amount: data.amount,
        due_date: data.due_date,
        status: data.status,
      });
    })
    .catch((error) => reject(error));
});

export {
  getPeoples,
  deleteSinglePeoples,
  createPeoples,
  updatePeoples,
  getSinglePeoples,
};
