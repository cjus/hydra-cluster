import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { PageHeader, Panel } from 'react-bootstrap';
import Image from 'components/Image';
import { sendHydraCommandMessage } from 'actions/hydra';
import { setPageTitle } from 'actions/ui';
import {
  Button,
  ButtonGroup
} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/github';
import config from 'config/config.json';
import AppLocalStorage from 'lib/AppLocalStorage';
import 'css/containers/RouterPage';

class RouterPage extends Component {
  constructor(props) {
    super(props);
    this.getServices = this.getServices.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
    this.getNodes = this.getNodes.bind(this);
  }

  componentWillMount() {
    let {setPageTitle} = this.props;
    setPageTitle('Router');
  }

  getServices() {
    let { sendHydraCommandMessage } = this.props;
    let message = {
      cmd: 'router services'
    }
    sendHydraCommandMessage(message);
  }

  getRoutes() {
    let { sendHydraCommandMessage } = this.props;
    let message = {
      cmd: 'router routes'
    }
    sendHydraCommandMessage(message);
  }

  getNodes() {
    let { sendHydraCommandMessage } = this.props;
    let message = {
      cmd: 'router nodes'
    }
    sendHydraCommandMessage(message);
  }

  render() {
    let { user, routerStat } = this.props;

    return (
      <div className='router'>
        <div className='router__container'>
          <PageHeader className='router__pageheader'>Router<small> - View Router Stats</small></PageHeader>
          <ButtonGroup>
            <Button onClick={this.getServices}>Services</Button>
            <Button onClick={this.getRoutes}>Routes</Button>
            <Button onClick={this.getNodes}>Nodes</Button>
          </ButtonGroup>
          <p/>
          <AceEditor
            mode='javascript'
            theme='github'
            width={'100%'}
            height={'calc(100vh - 20rem)'}
            tabSize={2}
            fontSize={18}
            showGutter={true}
            editorProps={{
              $blockScrolling: true,
              readOnly: true,
              newLineMode: true
            }}
            value={routerStat}
            name='jsEditor'
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let routerStat;
  let user = state.login.get('user');
  let command = state.hydra.get('command');

  console.log('command', command);
  if (command && command.result) {
    routerStat = JSON.stringify(command.result, null, 2);
  }
  return {
    user,
    routerStat
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    sendHydraCommandMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RouterPage);
