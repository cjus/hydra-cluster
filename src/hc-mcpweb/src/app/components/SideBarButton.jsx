import { default as React, Component } from 'react';
import {Link} from 'react-router';
import classNames from 'classnames';
import Image from 'components/Image';
import 'css/components/SideBarButton';

export default class SideBarButton extends Component {
  render() {
    return (
      <div className='sidebarbutton'>
        <Link className='sidebarbutton__link' to={this.props.to}>
          {false && (
            <Image className={classNames({
              'sidebarbutton__image': true,
              'sidebarbutton__text--active': this.props.active
            })} src={this.props.icon}/>            
          )}
          <span className={classNames({
            'sidebarbutton__text': true,
            'sidebarbutton__text--active': this.props.active
          })}>{this.props.title}</span>
        </Link>
      </div>
    );
  }
}

SideBarButton.propTypes = {
  id: React.PropTypes.string,
  active: React.PropTypes.bool,
  icon: React.PropTypes.object,
  title: React.PropTypes.string,
  to: React.PropTypes.string
};
