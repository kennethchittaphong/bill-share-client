import axios from 'axios';
import { clientCredentials } from '../utils/client';

const dbUrl = clientCredentials.databaseURL;

const getPeoples = (uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/people.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

const deleteSinglePeoples = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/people/${firebaseKey}.json`)
    .then(() => {
      getPeoples().then((peoplesArray) => resolve(peoplesArray));
    })
    .catch(reject);
});

const createPeoples = (peopleObj, uid) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/people.json`, peopleObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/people/${response.data.name}.json`, payload)
        .then(() => {
          getPeoples(uid).then((peoplesArr) => resolve(peoplesArr));
        });
    }).catch(reject);
});

const updatePeoples = (peopleObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/people/${peopleObj.firebaseKey}.json`, peopleObj)
    .then(resolve)
    .catch(reject);
});

const getSinglePeoples = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/people.json?orderBy="billId"&equalTo="${firebaseKey}"`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

export {
  getPeoples,
  deleteSinglePeoples,
  createPeoples,
  updatePeoples,
  getSinglePeoples,
};
