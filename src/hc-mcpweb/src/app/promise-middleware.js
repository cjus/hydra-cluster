import {
  setIsBusy, setIsNotBusy
} from 'actions/ui';

const promiseMiddleware = store => next => action => {
  const { promise, types, ...rest } = action;
  if (!promise) {
    return next(action);
  }

  const [START_TYPE, SUCCESS_TYPE, FAILURE_TYPE] = types;

  store.dispatch(setIsBusy());
  next({ ...rest, type: START_TYPE });
  return promise
    .then((result) => {
      result = { ...rest, ...result };
      next({ ...result, type: SUCCESS_TYPE });
      store.dispatch(setIsNotBusy());

      // Return result to allow chaining
      return result;
    })
    .catch((err) => {
      next({ ...rest, err: err.message, type: FAILURE_TYPE });
      store.dispatch(setIsNotBusy());
    });
};

export default promiseMiddleware;
