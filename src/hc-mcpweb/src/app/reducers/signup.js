import Immutable from 'immutable';
import {
  SEND_SIGNUP_SUCCESS,
  SEND_SIGNUP_FAILURE
} from 'actions/signup';

const initialState = Immutable.Map({
  isSignedup: false,
  message: ''
});

export default function signupReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_SIGNUP_SUCCESS:
      if (action.success === false) {
        return state.
          set('isSignedup', false).
          set('message', action.message);
      } else {
        return state.
          set('isSignedup', true).
          set('message', action.message);
      }
      break;
    default:
      return state;
  }
}
