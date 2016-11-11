import 'babel-polyfill';
import 'css/main';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Router from 'routes';
import { store, history } from 'store';

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}/>
      </Provider>
    );
  }
}

ReactDOM.render(<Root/>, document.getElementById('root'));
