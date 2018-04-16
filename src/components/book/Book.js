import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class Book extends Component {


  render() {
    const { id, title, author, published = null, onHeaderClick } = this.props;
    let publishedText = '';
    if (published) {
      publishedText = `, gefin út ${published}`;
    }
    return (
      <li className="book">
        <Link to={`/books/${id}`} className="book__header">{title}</Link>
        <p>Eftir {author}{publishedText}</p>
      </li>
    );
  }

}