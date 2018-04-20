import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { deleteRead } from '../../actions/user';
import { connect } from 'react-redux';
import DeleteButton from '../../components/deleteButton';
/* todo aðrar útgáfur af takka fyrir disabled, minni takka fyrir logout og "warning" takka */

class ReadBooks extends Component {

  state = {
    id: null,
    deleted: false,
  }

  static propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
  }

  deleteBook(id){
    const { dispatch } = this.props;
    dispatch(deleteRead(id));
    this.setState({ deleted: true })
  }

  render() {
    const { id, title, rating, review, onHeaderClick } = this.props;
    if(this.state.id == null){
      this.setState({id: id});
    }

    if(this.state.deleted){
      return (
      <p>Bók eytt </p>
      )
    }
    
    return (
      <li className="book">
        <Link to={`/books/${id}`} className="book__header">{title}</Link>
        <p>Einkunn: {rating}</p>
        <p>Umsögn: {review}</p>

        <DeleteButton className="delete-button" onClick={() => {this.deleteBook(this.state.id)}}> Eyða </DeleteButton>
      </li>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    isDeleting: state.user.isDeleting,
    error: state.user.error,
  }
}

export default connect(mapStateToProps)(ReadBooks);