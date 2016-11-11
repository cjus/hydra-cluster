import React, {Component} from 'react';

class Image extends Component {
  render() {
    return <img {...this.props}/>;
  }
}

Image.propTypes = {
  src: React.PropTypes.string.isRequired
};

export default Image;
