import { default as React, Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Input,
  ProgressBar
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import 'css/components/Terminal';

const promptIcon = <FontAwesome name='dollar'/>;

export default class Terminal extends Component {
  constructor(props) {
    super(props);

    this.handleTerminalInputChange = this.handleTerminalInputChange.bind(this);
    this.handleTerminalInputKeyPress = this.handleTerminalInputKeyPress.bind(this);

    this.state = {
      terminalInputText: ''
    };
  }

  componentWillReceiveProps() {
    setTimeout(() => {
      let node = ReactDOM.findDOMNode(this.refs.terminalView);
      if (node) {
        node.scrollTop = node.scrollHeight;
      }
    }, 0);
  }

  handleTerminalInputChange(e) {
    this.setState({
      terminalInputText: e.target.value
    });
  }

  handleTerminalInputKeyPress(e) {
    if (e.key === 'Enter') {
      let { onInput } = this.props;
      let { terminalInputText } = this.state;
      if (onInput && terminalInputText) {
        onInput(terminalInputText);
        this.setState({
          terminalInputText: ''
        });
      }
    }
  }

  render() {
    let { terminalInputText } = this.state;
    let log = this.props.log || [];

    return (
      <div className='terminal'>
        <div className='terminal__scrollview' ref='terminalView'>
          <div>
            {log.map((entry, idx) => {
              return <pre key={idx}>{entry}</pre>;
            })}
          </div>
        </div>
        {this.props.commandProcessing === false && (
          <Input className='terminal__input'
            type='text' value={terminalInputText} addonBefore={promptIcon}
            onChange={this.handleTerminalInputChange} onKeyPress={this.handleTerminalInputKeyPress}
            placeholder='Enter command or type help to view a list of commands' />
        )}
        {this.props.commandProcessing !== false && (
          <ProgressBar active bsStyle='success' now={100} />
        )}
      </div>
    );
  }
}

Terminal.propTypes = {
  log: React.PropTypes.array,
  commandProcessing: React.PropTypes.bool,
  onInput: React.PropTypes.func
};
