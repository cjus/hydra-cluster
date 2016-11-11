import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {toggleSidePanel} from 'actions/ui';
import Clock from 'components/Clock';
import Image from 'components/Image';
import arrow1Image from 'images/arrow-1.png';
import menu1Image from 'images/menu-1.png';
import config from 'config/config.json';

import 'css/components/Header';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderOpen: true
    };
    this.onSliderClick = this.onSliderClick.bind(this);
  }

  onSliderClick() {
    let {toggleSidePanel} = this.props;
    this.setState({
      sliderOpen: !this.state.sliderOpen
    });
    toggleSidePanel();
  }

  render() {
    let {pageTitle} = this.props;
    let {sliderOpen} = this.state;

    if (pageTitle === 'Home') {
      pageTitle = '';
    }

    let sliderIcon = (!sliderOpen) ? '☷' : '☰';

    return (
      <div className='header'>
        <a className='header__slider' onClick={this.onSliderClick}>
          {sliderIcon}
        </a>
        <div className='header__title'>{config.appTitle}</div>
        <div className='header__clock'><Clock/></div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let pageTitle = state.ui.get('pageTitle');
  return {
    pageTitle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    toggleSidePanel
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
