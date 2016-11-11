import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Image from 'components/Image';
import { PageHeader, Panel } from 'react-bootstrap';
import { setPageTitle } from 'actions/ui';
import { sendHydraCommandMessage } from 'actions/hydra';
import {
  Button
} from 'react-bootstrap';
import request from 'superagent';
import Terminal from 'components/terminal';
import config from 'config/config.json';
import AppLocalStorage from 'lib/AppLocalStorage';
import 'css/containers/Console';

class Console extends Component {
  constructor(props) {
    super(props);
    this.onInput = this.onInput.bind(this);
    this.finalizeOutput = this.finalizeOutput.bind(this);
    this.handleCommandHelp = this.handleCommandHelp.bind(this);
    this.handleClusterCommand = this.handleClusterCommand.bind(this);

    this.state = {
      terminalLog: [],
      commandProcessing: false,
      commands: {
        'help': this.handleCommandHelp,
        'cluster': this.handleClusterCommand
      }
    };
  }

  componentWillMount() {
    let {setPageTitle, user} = this.props;
    setPageTitle('Console');
    this.setState({
      terminalLog: [
        'MCP Shell (v0.0.1)',
        ' ',
        //`Welcome ${user.name}`,
        ''
      ],
      commandProcessing: false
    });
  }

  finalizeOutput() {
    let { terminalLog } = this.state;
    terminalLog.push(' ');
    this.setState({
      terminalLog,
      commandProcessing: false
    });
  }

  handleCommandHelp() {
    let { terminalLog } = this.state;

    terminalLog.push('Command listing:');
    terminalLog.push('* help - this command listing');
    terminalLog.push('* cluster init - Initialize cluster');
    terminalLog.push('* cluster ready - Enter ready state ');
    terminalLog.push('* cluster thinking - Simulate thinking state');
    terminalLog.push('* cluster error - Simulate error state');
    terminalLog.push('* cluster reset - Reset cluster');
    terminalLog.push('* cluster services - List registered microservices');
    terminalLog.push('* cluster routes - List microservice routes');
    terminalLog.push('* cluster nodes - List active node services');
    this.finalizeOutput();
  }

  handleClusterCommand(params) {
    let { terminalLog } = this.state;
    let { sendHydraCommandMessage } = this.props;

    terminalLog.push(`cluster called with params: ${params}`);

    let message = {
      cmd: `cluster ${params.join(' ')}`
    }
    sendHydraCommandMessage(message);

    this.finalizeOutput();
  }

  onInput(line) {
    let { terminalLog, commands } = this.state;
    let segments = line.split(' ');
    let command = segments[0];
    segments.shift();
    let params = segments;

    terminalLog.push(`> ${line}`);

    if (command in commands) {
      commands[command](params);
    } else {
      terminalLog.push(`unknown command ${command}`);
      terminalLog.push(' ');
      this.setState({
        terminalLog
      });
    }
  }

  render() {
    let { terminalLog, commandProcessing } = this.state;
    let { user } = this.props;
    return (
      <div className='console'>
        <div className='console__container'>
          <PageHeader className='console__pageheader'>Console<small> - Terminal access</small></PageHeader>
          <Terminal className='console__shell' log={terminalLog} onInput={this.onInput} commandProcessing={commandProcessing}/>
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
    setPageTitle,
    sendHydraCommandMessage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Console);
