import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import AppLocalStorage from 'lib/AppLocalStorage';
import yup from 'yup';
import Form, { Field, Message, Button as FormButton } from 'react-formal';
import querystring from 'querystring';
import Spinner from 'components/Spinner';
import {
  Button,
  Input,
  PageHeader,
  Panel
} from 'react-bootstrap';
import { setPageTitle } from 'actions/ui';
import { sendLogin, setLoggedIn } from 'actions/login';
import 'css/containers/Login';

const formSchema = yup.object({
  username: yup.string().required('• Email is required.'),
  password: yup.string().required('• Password is required.')
});

class Login extends Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.handleFormKeyPress = this.handleFormKeyPress.bind(this);
    this.state = {
      errors: []
    };
  }

  componentWillMount() {
    this.props.setPageTitle('Login');
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated) {
      props.setLoggedIn(props.user);
      this.setState({
        isRedirecting: true
      });
      let redirectTo = this.getRedirectPath();
      props.push(redirectTo);
    }
  }

  onLogin(formValues) {
    if (!formValues) {
      return;
    }
    let { username, password } = formValues;
    let { sendLogin } = this.props;
    sendLogin(username, password);
  }

  getRedirectPath() {
    let query = this.props.location.query;
    if (!query.next) {
      return '/dashboard';
    }
    let { next, ...params } = query;
    let redirect = next + (Object.keys(params).length > 0 ? `?${querystring.stringify(params)}` : '');
    return redirect;
  }

  handleFormKeyPress(e) {
    if (e.key === 'Enter') {
      this.refs.form.submit();
    }
  }

  render() {
    const { errors } = this.state;
    const { errorMessage } = this.props;
    let idx = 0;

    return (
      <div className='login'>
        <PageHeader className='login__pageheader'>Welcome!<small>&nbsp;&nbsp;Please login.</small></PageHeader>
        <Panel className='login__loginPanel' header='Login'>
          <Form ref='form' schema={formSchema} onSubmit={this.onLogin} onKeyPress={this.handleFormKeyPress}>
            <div className='login__container'>
              <Field className='login__inputEmail' name='username' placeholder='email'/>
              <Field className='login__inputPassword' name='password' placeholder='password' type='password'/>
              <FormButton className='login__button' component={Button} type='submit'>Log in</FormButton>
              {errors && (
                <div className='login__errors'>
                  {errors.map((err) => { idx += 1; return <div className='login__error' key={`error_${idx}`}>{err.replace(/<.*>/g, '')}</div>;})}
                  <Message for='username' component='div' errorClass='login__error'/>
                  <Message for='password' component='div' errorClass='login__error'/>
                </div>
              )}
              {errorMessage && (
                <div className='login__errors'>
                  Error: {errorMessage}
                </div>
              )}
              <div className='login__links'>
                <div className='login__resetPasswordLink'>
                  <Link to={{pathname: '/resetpassword', query: this.props.location.query }}>Forgot your password?</Link>
                </div>
                <div className='login__signupLink'>
                  <Link to={{pathname: '/signup', query: this.props.location.query }}>Need to sign up for an account?</Link>
                </div>
              </div>
            </div>
          </Form>
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let user = state.login.get('user');
  let errorMessage = state.login.get('errorMessage');
  let authenticated = state.login.get('isAuthenticated');
  let appLocalStorage = new AppLocalStorage();
  let profile = appLocalStorage.get('profile');

  if (profile && Object.keys(profile).length !== 0) {
    authenticated = true;
    user = profile;
  } else {
    authenticated = state.login.get('isAuthenticated');
    if (authenticated) {
      appLocalStorage.put('profile', user);
    }
  }
  return {
    isAuthenticated: authenticated,
    user,
    errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    sendLogin,
    setLoggedIn
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
