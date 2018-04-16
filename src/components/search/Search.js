import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '../button';

import './Search.css';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Search extends Component {

  onClick = (e) => {
    e.preventDefault();
    console.log('leita');
  }

  render() {
    return (
      <form className="search-form">
        <input type="text" placeholder="Bókaleit" />
        <Button onClick={this.onClick}>Leita</Button>
      </form>
    );
  }

}
