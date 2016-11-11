import APIClient from 'api/client';

export function sendLogin(username, password) {
  return new Promise((resolve, reject) => {
    let client = new APIClient();
    let body = {
      username,
      password
    };
    client.makeRequest({
      endpoint: '/login',
      method: 'post',
      body
    })
    .then((result) => {
      resolve(result);
    })
    .catch(reject);
  });
}

export default {
  sendLogin
};
