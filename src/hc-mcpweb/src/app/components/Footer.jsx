import { default as React, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import config from 'config/config.json';

import 'css/components/Footer';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='footer'>
        <div>{config.appTitle}</div>
        <div>&alpha; {config.version}</div>
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
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
