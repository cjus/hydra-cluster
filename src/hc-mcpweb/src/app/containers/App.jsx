import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import SideBar from 'components/SideBar';
import favicon from 'images/icons/favicon.png';
import MobileDetect from 'mobile-detect';
import { mobileDetect } from 'actions/mobile';
import 'css/containers/App';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    let {mobileDetect} = this.props;
    let md = new MobileDetect(window.navigator.userAgent);

    mobileDetect({
      mobile: md.mobile(),
      phone: md.phone(),
      os: md.os(),
      tablet: md.tablet()
    });
  }

  render() {
    let {sidePanel} = this.props;

    return (
      <div className='app'>
        <Helmet
          title='MCP'
          titleTemplate='%s'
          link={[{
            'rel': 'shortcut icon',
            'href': favicon
          }]}
          />
          <div className='app__container'>
            <Header />
            <div className='app__body'>
              {sidePanel && (
                <SideBar />
              )}
              <div className='app__content'>
                {this.props.children}
              </div>
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let sidePanel = state.ui.get('sidePanel');
  return {
    sidePanel
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    mobileDetect
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
