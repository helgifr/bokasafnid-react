import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchBooks } from '../../actions/books';
import { addReview, getReview } from '../../actions/review';
import Helmet from 'react-helmet';
import Button from '../../components/button';

import { deleteRead } from '../../actions/user';
import DeleteButton from '../../components/deleteButton';

import './Book.css';

class Book extends Component {

  state = {
    loading: true,
    deleted: false,
    };

  static propTypes = {
    dispatch: PropTypes.func,
    match: PropTypes.object,
    books: PropTypes.object,
    review: PropTypes.object,
  }

  reviewInput = React.createRef();
  gradeInput = React.createRef();

  async componentDidMount() {
    const { dispatch, match} = this.props;
    const { book } = match.params;
    await dispatch(fetchBooks(`/${book}`));
    await dispatch(getReview());
    
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { dispatch} = this.props;
    await dispatch(getReview());
  }

    read = (e) => {
    const { books, dispatch, review = [] } = this.props;
    const reviewInput = this.reviewInput.current.value;
    const rating = parseInt(this.gradeInput.current.value, 10);
    const bookId = books.id;
    dispatch(addReview(bookId, rating, reviewInput));
  }

  deleteBook(id){
    console.log("fer í fallid");
    
    const { dispatch } = this.props;
    dispatch(deleteRead(id));
    this.setState({ deleted: true })
  }

  cancel(){
    this.reviewInput.current.value="";
    this.gradeInput.current.value=1;
  }

  render() {
    const { books, match, review} = this.props;
    const { loading } = this.state;
    const bookRev = [];
    let bookIdinDb = 1;
    let allReadyReview = false;
    

    if(review){
      for(var i = 0; i < review.items.length; i++){
        if(review.items[i].book_id === books.id){
        bookIdinDb = review.items[i].id;
        bookRev.push({
          rating: review.items[i].rating,
          revari: review.items[i].review,
        });
        }
      }
    }
    
    if(bookRev.length > 0){
      allReadyReview = true;
    }
    

    if (loading) {
      return (
        <p>Sæki bók...</p>
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
        {!allReadyReview && <div className="rating">
          <div className="about">
              <h2>Um bók:</h2>
              <textarea name="description" className="textarea" ref={this.reviewInput}>
              </textarea>
          </div>
          <div className="dropdown">
            <p>Einkunn</p>
            <select ref={this.gradeInput}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="buttons">
          <div className="btnleft">
            <Button onClick={this.read} className="read">Skrá lesing</Button>
          </div>
          <div className="btnright">
            <DeleteButton className="delete-button" onClick={() => {this.cancel()}}> Hætta við </DeleteButton>
          </div>
          </div>
        </div>
        }
        {allReadyReview && <div>
        {(bookRev.map((rev) => {
          return (
            <div className="review">
              <h1>Lesin bók</h1>
              <h3>einkunn: {rev.rating}</h3>
              <h3>Um bók:  {rev.revari}</h3>
              <DeleteButton className="delete-button" onClick={() => {this.deleteBook(bookIdinDb)}}> Eyða </DeleteButton>
            </div>
          )
        }))}
        </div>}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.books.isFetching,
    books: state.books.books,
    error: state.books.error,
    isDeleting: state.user.isDeleting,
    deleteError: state.user.error,
    review: state.review.review,
  }
}

export default connect(mapStateToProps)(Book);