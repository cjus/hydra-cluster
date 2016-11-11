import Immutable from 'immutable';
import {
  SEND_PASSWORD_RESET_SUCCESS
} from 'actions/resetpassword';

const initialState = Immutable.Map({
  isPasswordReset: false,
  message: ''
});

export default function resetpasswordReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_PASSWORD_RESET_SUCCESS:
      if (action.success === false) {
        return state.
          set('isAuthenticated', false).
          set('message', action.error);
      } else {
        return state.
          set('isPasswordReset', true).
          set('message', action.message);
      }
    default:
      return state;
  }
}
