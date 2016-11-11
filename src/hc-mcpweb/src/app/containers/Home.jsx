import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Image from 'components/Image';
import { setPageTitle, toggleSidePanel } from 'actions/ui';
import {
  Button,
  ButtonInput
} from 'react-bootstrap';

import logoImage from 'images/logo.png';
import 'css/containers/Home';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let { setPageTitle, toggleSidePanel } = this.props;
    setPageTitle('Home');
    toggleSidePanel();
  }

  onLogin() {
    this.props.push('/login');
  }

  render() {
    return (
      <div className='home'>
        <div className='home__container'>
          <Image className='home__logo-image' src={logoImage}/>
          <div className='home__loginButton'>
            <ButtonInput type='submit' value='Login' bsSize='small' onClick={this.onLogin.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    toggleSidePanel
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
