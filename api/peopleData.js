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

const deletePeoples = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/people/${firebaseKey}.json`)
    .then(() => resolve('deleted'))
    .catch((error) => reject(error));
});

const createPeoples = (peopleObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/people.json`, peopleObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/people/${response.data.name}.json`, payload)
        .then(resolve)
        .catch(reject);
    });
});

const updatePeoples = (peopleObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/people/${peopleObj.firebaseKey}.json`, peopleObj)
    .then(resolve)
    .catch(reject);
});

const getSinglePeoples = (firebaseKey) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/people/${firebaseKey}.json`)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

export {
  getPeoples,
  deletePeoples,
  createPeoples,
  updatePeoples,
  getSinglePeoples,
};
