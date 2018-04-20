import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchBooks } from '../../actions/books';
import queryString from 'query-string';
import Helmet from 'react-helmet';

import Book from '../../components/book';
import Button from '../../components/button';

import './Books.css';

class Books extends Component {

  state = {
    loading: true,
    page: queryString.parse(this.props.location.search).page,
    query: queryString.parse(this.props.location.search).query,
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const { page = 1, query = '' } = this.state;
    console.log(page);
    
    console.log(`?offset=${10 * (page - 1)}&search=${query}`);
    
    await dispatch(fetchBooks(`?offset=${10 * (page - 1)}&search=${query}`));
    this.setState({ loading: false });
  }
  
  async componentDidUpdate(prevProps, prevState) {
    const newqs = queryString.parse(this.props.location.search);
    const { page = 1, query = '' } = newqs;

    if (prevState.page !== page || prevState.query !== query) {
      const { dispatch } = this.props;
      console.log(`?offset=${10 * (page - 1)}&search=${query}`);
      this.setState({ loading: true, page, query });
      await dispatch(fetchBooks(`?offset=${10 * (page - 1)}&search=${query}`));
      this.setState({ loading: false });
    }
  }

  render() {
    const { loading } = this.state;
    const { books } = this.props;
    const qs = queryString.parse(this.props.location.search);
    const { page = 1, query = '' } = qs;
    console.log(query);
    

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }

    return (
      <section>
        <Helmet title={`Bækur - síða ${page}`} />
        <h1>{query !== '' ? `Bókaleit: ${query}` : 'Bækur'}</h1>
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
          <Link className="book-back-button" to={{pathname: "/books", search: `?page=${Number(page) - 1}` + (query ? `&query=${query}` : '') }}><Button>{"<"} Fyrri síða</Button></Link>
        }
        <p className="page-number">Síða {page}</p>
        {books.items.length === 10 &&
          <Link to={{pathname: "/books", search: `?page=${Number(page) + 1}` + (query ? `&query=${query}` : '') }}><Button>Næsta síða ></Button></Link>
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