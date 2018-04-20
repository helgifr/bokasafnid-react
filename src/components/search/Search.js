import React, { Component } from 'react';

import Button from '../button';

import './Search.css';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Search extends Component {

  render() {
    return (
      <form action="/books" className="search-form">
        <input type="text" placeholder="Bókaleit" name="query" ref={this.query} />
        <Button>Leita</Button>
      </form>
    );
  }

}
