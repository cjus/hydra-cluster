import loginAPI from 'api/login';

export const SEND_LOGIN_START = 'SEND_LOGIN_START';
export const SEND_LOGIN_SUCCESS = 'SEND_LOGIN_SUCCESS';
export const SEND_LOGIN_FAILURE = 'SEND_LOGIN_FAILURE';

export function sendLogin(username, password) {
  return {
    types: [SEND_LOGIN_START, SEND_LOGIN_SUCCESS, SEND_LOGIN_FAILURE],
    promise: loginAPI.sendLogin(username, password)
  };
}

export const SET_LOGGED_IN = 'SET_LOGGED_IN';

export function setLoggedIn(user) {
  return {
    type: SET_LOGGED_IN,
    user
  };
}

export const SET_LOGGED_OUT = 'SET_LOGGED_OUT';

export function setLoggedOut() {
  return {
    type: SET_LOGGED_OUT
  };
}
