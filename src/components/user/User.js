import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './User.css';
/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class User extends Component {

  static propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
  }


  render() {
    const { id, name } = this.props;
    
    return (
      <li className="user">
        <Link to={`/users/${id}`} className="username">{name}</Link>
      </li>
    );
  }

}