import Immutable from 'immutable';
import {
  SEND_LOGIN_SUCCESS,
  SEND_LOGIN_FAILURE,
  SET_LOGGED_IN,
  SET_LOGGED_OUT
} from 'actions/login';

const initialState = Immutable.Map({
  isAuthenticated: false,
  token: '',
  user: null,
  errorMessage: ''
});

const HTTP_OK = 200;
const HTTP_INVALID_CREDENTIALS = 401;

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_LOGIN_SUCCESS:
      if (action.statusCode !== HTTP_OK) {
        return state.
          set('isAuthenticated', false).
          set('token', '').
          set('user', null).
          set('errorMessage', action.result.reason);
      } else {
        return state.
          set('isAuthenticated', true).
          set('token', action.result.token).
          set('errorMessage', '').
          set('user', action.result.user);
      }
      break;
    case SEND_LOGIN_FAILURE:
      return state.
        set('token', '').
        set('isAuthenticated', false).
        set('errorMessage', '');
    case SET_LOGGED_IN:
      return state.
        set('isAuthenticated', true).
        set('user', action.user);
    case SET_LOGGED_OUT:
      return state.
      set('isAuthenticated', false).
      set('token', '').
      set('user', null);
    default:
      return state;
  }
}
