import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import Helmet from 'react-helmet';

import './Book.css';

class Book extends Component {

  state = { loading: true };

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { book } = match.params;
    await dispatch(fetchBooks(`/${book}`));
    this.setState({ loading: false });
  }

  render() {

    const { books, match } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }

    return (
      <section className="book-info">
        <Helmet title={books.title} />
        <p className="book-title">{books.title}</p>
        <p>Eftir {books.author}</p>
        <p>ISBN13: {books.isbn13}</p>
        <p>{books.categoryTitle}</p>
        <p>{books.description}</p>
        {books.pagecount !== null &&
          <p>{books.pagecount} síður</p>
        }
        {books.language !== "" &&
          <p>Tungumál: {books.language}</p>
        }
        <Link to={`/books/${match.params.book}/edit`}>Breyta bók</Link>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.books.isFetching,
    books: state.books.books,
    error: state.books.error,
  }
}

export default connect(mapStateToProps)(Book);