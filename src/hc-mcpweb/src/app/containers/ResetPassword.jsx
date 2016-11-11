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
import { sendResetPassword } from 'actions/resetpassword';
import 'css/containers/ResetPassword';

const formSchema = yup.object({
  email: yup.string().required('• Email is required.')
});

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.onResetPassword = this.onResetPassword.bind(this);
    this.state = {
      errors: []
    };
  }

  componentWillMount() {
    this.props.setPageTitle('Reset password');
  }

  onResetPassword(formValues) {
    let { email } = formValues;
    let { sendResetPassword } = this.props;
    sendResetPassword(email);
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

  render() {
    const { errors } = this.state;
    const { isPasswordReset, message } = this.props;
    let idx = 0;

    return (
      <div className='resetpassword'>
        <PageHeader className='resetpassword__pageheader'>Reset Password<small></small></PageHeader>
        <Panel className='resetpassword__panel' header='Reset my password'>
          {!isPasswordReset && (
            <Form schema={formSchema} onSubmit={this.onResetPassword}>
              <div className='resetpassword__container'>
                <Field className='resetpassword__inputEmail' name='email' placeholder='email'/>
                <FormButton type='submit' component={Button} className='resetpassword__button'>Do it!</FormButton>
                {errors && (
                  <div className='resetpassword__errors'>
                    {errors.map((err) => { idx += 1; return <div className='resetpassword__error' key={`error_${idx}`}>{err.replace(/<.*>/g, '')}</div>;})}
                    <Message for='username' component='div' errorClass='resetpassword__error'/>
                  </div>
                )}
                {message && (
                  <div className='resetpassword__errors'>
                    Error: {message}
                  </div>
                )}
                <div className='resetpassword__links'>
                  <div className='resetpassword__goBackLink'>
                    <Link to={{pathname: '/login', query: this.props.location.query }}>Go back, I think I just remembered my password!</Link>
                  </div>
                </div>
              </div>
            </Form>
          )}
          {isPasswordReset && (
            <div>We've sent you an email with a password reset link. Please check your email then try logging in again:&nbsp;
              <Link to={{pathname: '/login', query: this.props.location.query }}>Login</Link>
            </div>
          )}
        </Panel>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let isPasswordReset = state.resetpassword.get('isPasswordReset');
  let message = state.resetpassword.get('message');
  return {
    isPasswordReset,
    message
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    sendResetPassword
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
