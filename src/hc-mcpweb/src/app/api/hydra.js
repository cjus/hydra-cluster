import APIClient from 'api/client';

export function getHydraServicesStatus() {
  return new Promise((resolve, reject) => {
    let client = new APIClient();
    client.makeRequest({
      endpoint: 'list/services'
    })
    .then((response) => {
      resolve({
        data: response
      });
    })
    .catch((err) => {
      console.log('hydra API', err);
      reject(err);
    });
  });
}

export function sendHydraCommandMessage(message) {
  return new Promise((resolve, reject) => {
    let client = new APIClient();
    client.makeRequest({
      endpoint: 'command',
      method: 'post',
      body: message
    })
    .then((response) => {
      resolve({
        data: response
      });
    })
    .catch((err) => {
      console.log('hydra API', err);
      reject(err);
    });
  });
}

export default {
  getHydraServicesStatus,
  sendHydraCommandMessage
};
