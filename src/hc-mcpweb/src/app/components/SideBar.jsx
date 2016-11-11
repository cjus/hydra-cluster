import {default as React, Component} from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideBarButton from 'components/SideBarButton';
import Image from 'components/Image';
import calendarImage from 'images/calendar.png';
import computerImage from 'images/computer.png';
import menu3Image from 'images/menu-3.png';
import file3Image from 'images/file-3.png';
import shareImage from 'images/share.png';
import logoImage from 'images/logo.png';
import 'css/components/SideBar';

class SideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {pageTitle} = this.props;

    return (
      <div className='sidebar'>
        <div className='sidebar__title'>Modules</div>
        <SideBarButton id='dashboard' icon={menu3Image} title='Dashboard' to='/dashboard' active={pageTitle === 'Dashboard'}/>
        <SideBarButton id='router' icon={shareImage} title='Router' to='/router' active={pageTitle === 'Router'}/>
        <SideBarButton id='console' icon={computerImage} title='Console' to='/console' active={pageTitle === 'Console'}/>
        <SideBarButton id='scheduler' icon={calendarImage} title='Scheduler' to='/scheduler' active={pageTitle === 'Scheduler'}/>
        <SideBarButton id='docs' icon={file3Image} title='Documentation' to='/documentation' active={pageTitle === 'Documentation'}/>
        <Image className='sidebar__logo-image' src={logoImage}/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  let pageTitle = state.ui.get('pageTitle');
  return {
    pageTitle
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    push
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
