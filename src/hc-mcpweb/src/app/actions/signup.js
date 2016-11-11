import signupAPI from 'api/signup';

export const SEND_SIGNUP_START = 'SEND_SIGNUP_START';
export const SEND_SIGNUP_SUCCESS = 'SEND_SIGNUP_SUCCESS';
export const SEND_SIGNUP_FAILURE = 'SEND_SIGNUP_FAILURE';

export function sendSignup(username, email, password) {
  return {
    types: [SEND_SIGNUP_START, SEND_SIGNUP_SUCCESS, SEND_SIGNUP_FAILURE],
    promise: signupAPI.sendSignup(username, email, password)
  };
}
