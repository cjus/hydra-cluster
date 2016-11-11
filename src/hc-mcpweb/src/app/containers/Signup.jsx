import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
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
import { sendSignup } from 'actions/signup';
import 'css/containers/Signup';

const formSchema = yup.object({
  username: yup.string().required('• Username is required.'),
  email: yup.string().required('• Email is required.'),
  password: yup.string().required('• Password is required.'),
  password2: yup.string().required('• Confirm password is required.')
});

class Signup extends Component {
  constructor(props) {
    super(props);
    this.onSignup = this.onSignup.bind(this);
    this.state = {
      errors: []
    };
  }

  componentWillMount() {
    this.props.setPageTitle('Login');
  }

  componentWillReceiveProps(props) {
    if (props.isAuthenticated) {
      this.setState({
        isRedirecting: true
      });
      let redirectTo = this.getRedirectPath();
      props.push(redirectTo);
    }
  }

  onSignup(formValues) {
    if (!formValues) {
      return;
    }
    let { username, email, password, password2 } = formValues;
    let { sendSignup } = this.props;

    if (password !== password2) {
      return;
    }
    sendSignup(username, email, password);
  }

  render() {
    const { errors } = this.state;
    const { isSignedup, message } = this.props;
    let idx = 0;

    return (
      <div className='signup'>
        <PageHeader className='signup__pageheader'>Welcome!<small>&nbsp;&nbsp;Please signup.</small></PageHeader>
        <Panel className='signup__signupPanel' header='Signup'>
          {!isSignedup && (
            <Form schema={formSchema} onSubmit={this.onSignup}>
              <div className='signup__container'>
                <Field className='signup__inputUsername' name='username' placeholder='username'/>
                <Field className='signup__inputEmail' name='email' placeholder='email'/>
                <Field className='signup__inputPassword' name='password' placeholder='password' type='password'/>
                <Field className='signup__inputPassword' name='password2' placeholder='confirm password' type='password'/>
                <FormButton className='signup__button' component={Button} type='submit'>Signup</FormButton>
                {errors && (
                  <div className='signup__errors'>
                    {errors.map((err) => { idx += 1; return <div className='signup__error' key={`error_${idx}`}>{err.replace(/<.*>/g, '')}</div>;})}
                    <Message for='username' component='div' errorClass='signup__error'/>
                    <Message for='email' component='div' errorClass='signup__error'/>
                    <Message for='password' component='div' errorClass='signup__error'/>
                    <Message for='password2' component='div' errorClass='signup__error'/>
                  </div>
                )}
                {!isSignedup && message && (
                  <div className='signup__errors'>
                    Error: {message}
                  </div>
                )}
                <div className='signup__links'>
                  <div className='signup__goBackLink'>
                    <Link to={{pathname: '/login', query: this.props.location.query }}>Go back, I think I have an account!</Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
          {isSignedup && message && (
            <div>{message}
              <Link to={{pathname: '/login', query: this.props.location.query }}>Login</Link>
            </div>
          )}
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let isSignedup = state.signup.get('isSignedup');
  let message = state.signup.get('message');
  return {
    isSignedup,
    message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    sendSignup
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
