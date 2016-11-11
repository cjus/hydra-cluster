import APIClient from 'api/client';

export function sendResetPassword(username) {
  return new Promise((resolve, reject) => {
    let client = new APIClient();
    let body = {
      'email_id': username
    };
    client.makeRequest({
      endpoint: 'user/action/password/reset',
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
  sendResetPassword
};
