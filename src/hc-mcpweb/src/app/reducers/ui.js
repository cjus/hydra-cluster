import Immutable from 'immutable';
import {
  SET_IS_BUSY,
  SET_IS_NOT_BUSY,
  SET_PAGE_ERROR,
  CLEAR_PAGE_ERROR,
  SET_LAST_PAGE,
  SET_PAGE_TITLE,
  TOGGLE_SIDE_PANEL
} from 'actions/ui';

const initialState = Immutable.Map({
  busyCount: 0,
  isBusy: false,
  sidePanel: true,
  routeName: '',
  pageTitle: ''
});

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IS_BUSY:
      return state.set('busyCount', state.get('busyCount') + 1).set('isBusy', true);
    case SET_IS_NOT_BUSY:
      let newState = state.set('busyCount', state.get('busyCount') - 1);
      return newState.set('isBusy', newState.get('busyCount') != 0);
    case SET_PAGE_ERROR:
    case CLEAR_PAGE_ERROR:
      return state.set('pageErrorMessage', action.message);
    case SET_LAST_PAGE:
      return state.set('routeName', action.routeName);
    case SET_PAGE_TITLE:
      return state.set('pageTitle', action.title);
    case TOGGLE_SIDE_PANEL:
      return state.set('sidePanel', !state.get('sidePanel'));
    default:
      return state;
  }
}
