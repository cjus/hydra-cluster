import React, { Component } from 'react';
import Helmet from 'react-helmet';
import {Link} from 'react-router';
import {
  Button
} from 'react-bootstrap';
import 'css/components/ErrorPage';

export default class ErrorPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <div className='errorpage'>
        <Helmet title='Error'/>
        <div className='errorpage__title'>Page Not Found</div>
        <div className='errorpage__body'>The page you&rsquo;re looking for isn&rsquo;t available. We&rsquo;ve flagged this for review.</div>
        <div className='errorpage__image-container'>
        </div>
        <Link to='/'><Button className='errorpage__button'>Return</Button></Link>
      </div>
    );
  }
}
