import React from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import querystring from 'querystring';

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    componentWillMount () {
      this.checkAuth();
    }

    componentWillReceiveProps () {
      this.checkAuth();
    }

    checkAuth () {
      if (!this.props.isAuthenticated) {
        let redirectAfterLogin = this.props.location.pathname;
        let params = {
          next: redirectAfterLogin
        };
        Object.keys(this.props.location.query).forEach((key) => {
          params[key] = this.props.location.query[key];
        });
        this.props.dispatch(replace(`/login?${querystring.stringify(params)}`));
      }
    }

    render () {
      return this.props.isAuthenticated === true ? <Component {...this.props}/> : <div></div>;
    }
  }

  const mapStateToProps = (state) => ({
    isAuthenticated: state.login.get('isAuthenticated')
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
