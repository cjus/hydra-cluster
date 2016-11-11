export const SET_IS_BUSY = 'SET_IS_BUSY';
export const SET_IS_NOT_BUSY = 'SET_IS_NOT_BUSY';
export const SET_PAGE_ERROR = 'SET_PAGE_ERROR';
export const CLEAR_PAGE_ERROR = 'CLEAR_PAGE_ERROR';
export const SET_LAST_PAGE = 'SET_LAST_PAGE';
export const SET_PAGE_TITLE = 'SET_PAGE_TITLE';
export const TOGGLE_SIDE_PANEL = 'TOGGLE_SIDE_PANEL';

export function setIsBusy() {
  return {
    type: SET_IS_BUSY
  };
}

export function setIsNotBusy() {
  return {
    type: SET_IS_NOT_BUSY
  };
}

export function setPageError(message) {
  return {
    type: SET_PAGE_ERROR,
    message
  };
}

export function clearPageError() {
  return {
    type: CLEAR_PAGE_ERROR,
    message: ''
  };
}

export function setLastPage(routeName) {
  return {
    type: SET_LAST_PAGE,
    routeName
  };
}

export function setPageTitle(title) {
  return {
    type: SET_PAGE_TITLE,
    title
  };
}

export function toggleSidePanel() {
  return {
    type: TOGGLE_SIDE_PANEL
  };
}
