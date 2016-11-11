import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import config from 'config/config.json';
import promiseMiddleware from 'promise-middleware';
import reducers from 'reducers';

let middleware = [
  applyMiddleware(
    thunk,
    promiseMiddleware,
    routerMiddleware(browserHistory)
  )
];

let reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

if (window.devToolsExtension && config.environment.indexOf('dev') === 0) {
  window.devToolsExtension = window.devToolsExtension();
  middleware.push(
    window.devToolsExtension
  );
}

const store = compose(
  ...middleware
)(createStore)(reducer);

const history = syncHistoryWithStore(browserHistory, store);

history.listen(() => {
  setTimeout(() => window.scrollTo(0, 0));
});

export default {
  store,
  history
};
