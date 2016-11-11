import { default as React, Component } from 'react';
import { Panel } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import 'css/components/MDPanel';

export default class MDPanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='mdpanel'>
        <Panel header={this.props.title}>
          <ReactMarkdown source={this.props.src} />
        </Panel>
      </div>
    );
  }
}

MDPanel.propTypes = {
  src: React.PropTypes.string,
  title: React.PropTypes.string
};
