import resetpasswordAPI from 'api/resetpassword';

export const SEND_PASSWORD_RESET_START = 'SEND_PASSWORD_RESET_START';
export const SEND_PASSWORD_RESET_SUCCESS = 'SEND_PASSWORD_RESET_SUCCESS';
export const SEND_PASSWORD_RESET_FAILURE = 'SEND_PASSWORD_RESET_FAILURE';

export function sendResetPassword(username) {
  return {
    types: [SEND_PASSWORD_RESET_START, SEND_PASSWORD_RESET_SUCCESS, SEND_PASSWORD_RESET_FAILURE],
    promise: resetpasswordAPI.sendResetPassword(username)
  };
}
