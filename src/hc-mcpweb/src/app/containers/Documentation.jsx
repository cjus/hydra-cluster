import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Image from 'components/Image';
import { PageHeader, Panel } from 'react-bootstrap';
import { setPageTitle } from 'actions/ui';
import {
  Button
} from 'react-bootstrap';
import MDPanel from 'components/MDPanel';
import clusterDoc from '../cluster.md'
import hydraDoc from '../documentation.md';
import config from 'config/config.json';
import AppLocalStorage from 'lib/AppLocalStorage';
import 'css/containers/Documentation';

class Documentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount() {
    let {setPageTitle} = this.props;
    setPageTitle('Documentation');
  }

  render() {
    let { user } = this.props;
    return (
      <div className='documentation'>
        <div className='documentation__container'>
          <PageHeader className='documentation__pageheader'>Documentation<small> - Help System</small></PageHeader>
          <MDPanel src={clusterDoc} title={'Cluster'} />
          <MDPanel src={hydraDoc} title={'Hydra'} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let user = state.login.get('user');
  return {
    user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Documentation);
