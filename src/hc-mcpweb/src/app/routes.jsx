import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import Login from 'containers/Login';
import Signup from 'containers/Signup';
import ResetPassword from 'containers/ResetPassword';
import Dashboard from 'containers/Dashboard';
import Console from 'containers/Console';
import RouterPage from 'containers/RouterPage';
import Scheduler from 'containers/Scheduler';
import Documentation from 'containers/Documentation';
import ErrorPage from 'components/ErrorPage';

import requireAuthentication from 'components/AuthenticatedComponent';

export default function Routes({history}) {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home}/>
        <Route path='hc-mcp' component={Home}/>
        <Route path='home' component={Home}/>
        <Route path='login' component={Login}/>
        <Route path='signup' component={Signup}/>
        <Route path='resetpassword' component={ResetPassword}/>
        <Route path='dashboard' component={requireAuthentication(Dashboard)}/>
        <Route path='console' component={requireAuthentication(Console)}/>
        <Route path='router' component={requireAuthentication(RouterPage)}/>
        <Route path='scheduler' component={requireAuthentication(Scheduler)}/>
        <Route path='documentation' component={requireAuthentication(Documentation)}/>
        <Route path='*' component={ErrorPage}/>
      </Route>
    </Router>
  );
}
