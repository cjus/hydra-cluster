import { default as React, Component } from 'react';
import { default as raf } from 'raf';
import 'css/components/Clock';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeString: ''
    };
  }

  componentDidMount() {
    const tick = () => {
      let d = new Date();
      let ts =
        ('0' + (d.getMonth() + 1)).slice(-2) + '/' + ('0' + d.getDate()).slice(-2) + '/' + d.getFullYear() + ' ' +
        ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2) + ':' +
        ('0' + d.getSeconds()).slice(-2);
      this.setState({
        timeString: ts
      });
      raf(tick);
    };
    raf(tick);
  }

  render() {
    let {timeString} = this.state;

    return (
      <div className='clock'>
        {timeString}
      </div>
    );
  }
}

Clock.propTypes = {
};
