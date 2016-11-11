import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Image from 'components/Image';
import { setPageTitle } from 'actions/ui';
import { getHydraServicesStatus } from 'actions/hydra';
import {
  Button,
  ButtonGroup,
  PageHeader,
  Panel,
  ProgressBar,
  Well
} from 'react-bootstrap';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import config from 'config/config.json';
import AppLocalStorage from 'lib/AppLocalStorage';
import WSDispatch from 'lib/WSDispatch';
const uuid = require('uuid');
const base64 = require('base-64');
import 'css/containers/Scheduler';

let wsDispatch = new WSDispatch();

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.onEditorChange = this.onEditorChange.bind(this);
    this.validateCode = this.validateCode.bind(this);
    this.submitCode = this.submitCode.bind(this);
    this.state = {
      editorJS: '{}',
      consoleOutput: '',
      progress: 0
    };
  }

  componentWillMount() {
    let {setPageTitle, getHydraServicesStatus} = this.props;
    setPageTitle('Scheduler');

    let ws = new WebSocket('ws://192.168.1.10');

    this.setState({
      ws
    });

    ws.onopen = () => {
      wsDispatch.sendMessage(ws, {
        mid: uuid.v4(),
        to: `hc-pylights:/`,
        from: 'mcpweb:/',
        body: {
          cmd: 'blue'
        }
      });
    }

    ws.onmessage = (evt) => {
      wsDispatch.handleMessage(evt.data);
    };

    ws.onclose = () => {
      console.log('socket closed');
    };

    getHydraServicesStatus();
  }

  onEditorChange(newValue) {
    this.setState({
      editorJS: newValue
    });
  }

  validateCode() {
    let { ws, editorJS, consoleOutput, progress } = this.state;
    let { services } = this.props;

    consoleOutput = '';
    progress = 100;

    this.setState({
      consoleOutput,
      progress
    });

    services.result.forEach((service) => {
      if (service.serviceName === 'hc-iotnode' && service.port === 10001) {

        wsDispatch.sendMessage(ws, {
          mid: uuid.v4(),
          to: `hc-pylights:/`,
          from: 'mcpweb:/',
          body: {
            cmd: 'thinking'
          }
        });

        let message = {
          mid: uuid.v4(),
          to: `${service.instanceID}@hc-iotnode:/`,
          from: 'mcpweb:/',
          body: {
            code: base64.encode(editorJS)
          }
        };
        wsDispatch.sendMessage(ws, message, (msg) => {
          console.log('msg', msg);
          if (msg && msg.bdy) {
            consoleOutput += `\n${msg.ts} | ${msg.frm} \n`;
            if (msg.bdy.error) {
              consoleOutput += msg.bdy.error;
              wsDispatch.sendMessage(ws, {
                mid: uuid.v4(),
                to: `hc-pylights:/`,
                from: 'mcpweb:/',
                body: {
                  cmd: 'red'
                }
              });
            } else {
              if (typeof msg.bdy.result === 'object') {
                consoleOutput += JSON.stringify(msg.bdy.result);
              } else {
                consoleOutput += msg.bdy.result;
              }
              wsDispatch.sendMessage(ws, {
                mid: uuid.v4(),
                to: `hc-pylights:/`,
                from: 'mcpweb:/',
                body: {
                  cmd: 'green'
                }
              });
            }
            consoleOutput += '\n\n';
            this.setState({
              consoleOutput,
              progress: 0
            });
          }
        });
      }
    });
  }

  submitCode() {
    let { ws, editorJS, consoleOutput } = this.state;
    let { services } = this.props;

    consoleOutput = '';

    wsDispatch.sendMessage(ws, {
      mid: uuid.v4(),
      to: `hc-pylights:/`,
      from: 'mcpweb:/',
      body: {
        cmd: 'off'
      }
    });
  }

  render() {
    let { user, services } = this.props;
    let { editorJS, consoleOutput, progress } = this.state;
    let workerCount = 0;

    if (services) {
      services.result.forEach((service) => {
        if (service.serviceName === 'hc-iotnode') {
          workerCount += 1;
        }
      });
    }

    return (
      <div className='scheduler'>
        <div className='scheduler__container'>
          <PageHeader className='scheduler__pageheader'>Scheduler<small> - Job Scheduler</small></PageHeader>
          <Well>{workerCount} compute nodes detected</Well>
          <AceEditor
            mode='javascript'
            theme='github'
            width={'100%'}
            height={'calc(100vh - 60rem)'}
            tabSize={2}
            fontSize={18}
            showGutter={true}
            editorProps={{
              $blockScrolling: true,
              readOnly: true,
              newLineMode: true
            }}
            value={editorJS}
            onChange={this.onEditorChange}
            name='jsEditor'
          />
          <p/><p/>
          <ButtonGroup>
            <Button onClick={this.validateCode}>Validate</Button>
            <Button onClick={this.submitCode}>Submit</Button>
          </ButtonGroup>
          <Panel className ='scheduler__output' header='Output'>
            <ProgressBar active now={progress} />
            <pre><code>{consoleOutput}</code></pre>
          </Panel>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let user = state.login.get('user');
  let services;
  if (state.hydra) {
    services = state.hydra.get('services');
  }
  return {
    user,
    services
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push,
    setPageTitle,
    getHydraServicesStatus
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Scheduler);
