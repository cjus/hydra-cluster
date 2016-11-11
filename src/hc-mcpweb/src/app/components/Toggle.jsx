import { default as React, Component } from 'react';
import 'css/components/Toggle';

export default class Toggle extends Component {
  render() {
    return (
      <div>
        <input id={this.props.id} className='toggle toggle-round' type='checkbox' checked={this.props.checked} onChange={this.props.onChange}></input>
        <label htmlFor={this.props.id}></label>
      </div>
    );
  }
}

Toggle.propTypes = {
  id: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChanged: React.PropTypes.func,
  onSwitch: React.PropTypes.func
};
