import { clientCredentials } from '../utils/client';

const getPeoples = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples/${uid}`)
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
  fetch(`${clientCredentials.databaseURL}/peoples/${firebaseKey}.json`)
    .then(() => {
      getPeoples().then((peoplesArray) => resolve(peoplesArray));
    })
    .catch(reject);
});

const createPeoples = (peopleObj) => new Promise((resolve, reject) => {
  // fetch(`${clientCredentials.databaseURL}/peoples`, peopleObj)
  //   // .then((res) => res.json())
  //   .then((response) => {
  //     console.log('create people log ===', response);
  //     // const payload = { billId: response.data.name };
  //     // fetch(`${clientCredentials.databaseURL}/peoples/${response.data.name}.json`, payload)
  //     //   .then(() => {
  //     //     getPeoples(uid).then((peoplesArr) => resolve(peoplesArr));
  //     //   });
  //   }).catch(reject);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  const raw = JSON.stringify(peopleObj);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(`${clientCredentials.databaseURL}/peoples`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('result ===', result);
      resolve();
    })
    .catch((error) => {
      console.log('error', error);
      reject();
    });
});

const updatePeoples = (peopleObj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples/${peopleObj.firebaseKey}.json`, peopleObj)
    .then(resolve)
    .catch(reject);
});

const getSinglePeoples = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/peoples.json?orderBy="billId"&equalTo="${firebaseKey}"`)
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
