import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import { addReview } from '../../actions/review';
import Helmet from 'react-helmet';
import Button from '../../components/button';

import './Book.css';

class Book extends Component {

  state = { loading: true };

  reviewInput = React.createRef();
  gradeInput = React.createRef();

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { book } = match.params;
    await dispatch(fetchBooks(`/${book}`));
    this.setState({ loading: false });
  }

  read = (e) => {
    const { books, dispatch, review = [] } = this.props;
    const reviewInput = this.reviewInput.current.value;
    const rating = parseInt(this.gradeInput.current.value);
    const bookId = books.id;
    dispatch(addReview(bookId, rating, reviewInput));
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
        <div>
        <form className="reviewForm">
          <div className="field">
            <p>Review</p>
            <textarea rows="4" cols="50" name="description" ref={this.reviewInput}>
            </textarea>
          </div>
            <select ref={this.gradeInput}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <Button onClick={this.read} className="read">Vista</Button>
          </form>
        </div>
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