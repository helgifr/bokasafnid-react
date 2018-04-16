import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import queryString from 'query-string';

import Book from '../../components/book';
import Button from '../../components/button';

class Books extends Component {

  state = {
    loading: true,
    page: queryString.parse(this.props.location.search).page,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchBooks(`?offset=${10 * (this.state.page - 1)}`));
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const newqs = queryString.parse(this.props.location.search);
    if (prevState.page !== newqs.page) {
      const { dispatch } = this.props;
      this.setState({ loading: true, page: newqs.page });
      await dispatch(fetchBooks(`?offset=${10 * (newqs.page - 1)}`));
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { books } = this.props;
    const qs = queryString.parse(this.props.location.search);
    const { page = 1, query = '' } = qs;

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }
    
    return (
      <section>
        <h1>Bækur</h1>
        <ul>
          {books.items.map((book) => {
            return (
              <Book
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                published={book.published}
              />
            )
          })}
        </ul>
        {page > 1 &&
          <Link to={{pathname: "/books", search: `?page=${Number(page) - 1}` + (query ? `?${query}` : '') }}><Button>{"<"} Til baka</Button></Link>
        }
        {books.items.length === 10 &&
          <Link to={{pathname: "/books", search: `?page=${Number(page) + 1}` + (query ? `?${query}` : '') }}><Button>Næsta síða ></Button></Link>
        }
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

export default connect(mapStateToProps)(Books);