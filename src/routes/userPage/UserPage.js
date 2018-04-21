import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/allUsers';
import PropTypes from 'prop-types';
import { fetchReadUser } from '../../actions/user';
import Helmet from 'react-helmet';

import './userPage.css';

import ReadBook from '../../components/readBooks';
import queryString from 'querystring';
import Button from '../../components/button';

class UserPage extends Component {

  state = { loading: true };

  static propTypes = {
    books: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  info(user) {
    const { name, image } = user;
    let src;
    if (image) {
      src = image;
    } else {
      src = "/profile.jpg";
    }
    return (
      <div className="user-page">
        <img src={src} alt="profile" />
        <p className="name"> {name} </p>
      </div>
    );
  }

  books(){
    const { match } = this.props;
    const { loading } = this.state;
    const { books } = this.props;
    const { user } = match.params;

    const qs = queryString.parse((this.props.location.search).substring(1));
    const { page = 1 } = qs;

    if (loading) {
      return (
        <p>Sæki bækur...</p>
      );
    }
    return (
      <section>
        <h1 className="title">Lesnar bækur</h1>
        <ul>
          {books.items.map((book) => {
            return (
              <ReadBook
                key={book.id}
                id={book.id}
                title={book.title}
                rating={book.rating}
                review={book.review}
              />
            )
          })}
        </ul>
        {page > 1 &&
          <Link to={{pathname: `/users/${user}`, search: `?page=${Number(page) - 1}`}}><Button>{"<"} Til baka</Button></Link>
        }
        {books.items.length === 10 &&
          <Link to={{pathname: `/users/${user}`, search: `?page=${Number(page) + 1}`}}><Button>Næsta síða ></Button></Link>
        }
      </section>
    );

  }

  

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { user } = match.params;
    await dispatch(fetchUsers(user));
    await dispatch(fetchReadUser(user,`?offset=${10 * (this.state.page - 1)}`));
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps, prevState) {
    const { match } = this.props;
    const newqs = queryString.parse((this.props.location.search).substring(1));
    const { page = 1 } = newqs;
    const { user } = match.params;
    if (prevState.page !== page) {
      const { dispatch } = this.props;
      this.setState({ loading: true, page });
      await dispatch(fetchReadUser(user,`?offset=${10 * (page - 1)}`));
      this.setState({ loading: false });
    }
  }


  render() {

    const { user } = this.props;
    const { loading } = this.state;

    if (loading) {
      return (
        <p>Sæki notenda...</p>
      );
    }

    return (
      <div className="userPage">
        <section>
          <Helmet title={user.name} />
          {this.info(user)}
          {this.books()}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.allUsers.isFetching,
    user: state.allUsers.users,
    error: state.allUsers.error,
    isFetchingBooks: state.user.isFetching,
    books: state.user.books,
    booksError: state.user.error,
  }
}

export default connect(mapStateToProps)(UserPage);