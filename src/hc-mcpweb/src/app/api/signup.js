import APIClient from 'api/client';

export function sendSignup(username, email, password) {
  return new Promise((resolve, reject) => {
    let client = new APIClient();
    let body = {
      username,
      password
    };
    client.makeRequest({
      endpoint: 'profile/user',
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
  sendSignup
};
