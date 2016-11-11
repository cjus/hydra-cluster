import Immutable from 'immutable';
import {
  MOBILE_DETECT
} from 'actions/mobile';

const initialState = Immutable.Map({
  mobile: null,
  phone: null,
  tablet: null
});

export default function mobileDetectReducer(state = initialState, action) {
  switch (action.type) {
    case MOBILE_DETECT:
      return state.
        set('mobile', action.mobile).
        set('phone', action.phone).
        set('tablet', action.tablet);
    default:
      return state;
  }
}
