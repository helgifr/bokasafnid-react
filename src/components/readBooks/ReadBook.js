import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


import DeleteButton from '../../components/deleteButton';
/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

export default class ReadBooks extends Component {

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
  }

  deleteBook(id){
    //console.log(id);
    
  }

  render() {
    const { id, title, rating, review, onHeaderClick } = this.props;

    return (
      <li className="book">
        <Link to={`/books/${id}`} className="book__header">{title}</Link>
        <p>Einkunn: {rating}</p>
        <p>Umsögn: {review}</p>

        <DeleteButton className="delete-button" onClick={this.deleteBook(id)}> Eyða </DeleteButton>
      </li>
    );
  }

}