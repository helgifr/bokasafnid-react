import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class ReadBooks extends Component {


  render() {
    const { id, title, rating, review, onHeaderClick } = this.props;

    return (
      <li className="book">
        <Link to={`/books/${id}`} className="book__header">{title}</Link>
        <p>Einkunn: {rating}</p>
        <p>Umsögn: {review}</p>
      </li>
    );
  }

}