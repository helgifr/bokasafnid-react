import React, { Component } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';


import { Link } from 'react-router-dom';

import { fetchUsersPage } from '../../actions/allUsers';

import queryString from 'query-string';

import './Users.css';
import Button from '../../components/button';

import User from '../../components/user';

class Users extends Component {

  state = {
    loading: true,
    page: queryString.parse(this.props.location.search).page,
  }

  static propTypes = {
    dispatch: PropTypes.func,
    users: PropTypes.object,
  }

async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchUsersPage(`?offset=${10 * (this.state.page - 1)}`));
    this.setState({ loading: false });
  }

async componentDidUpdate(prevProps, prevState) {
  const newqs = queryString.parse(this.props.location.search);
  const { page = 1 } = newqs;

  if (prevState.page !== page) {
    const { dispatch } = this.props;
    this.setState({ loading: true, page });
    await dispatch(fetchUsersPage(`?offset=${10 * (page - 1)}`));
    this.setState({ loading: false });
  }
}
  render() {
    const { loading } = this.state;
    const { users } = this.props;

    const qs = queryString.parse(this.props.location.search);
    const { page = 1 } = qs;

    if (loading) {
      return (
        <p>Sæki notendur...</p>
      );
    }

    return (
      <div className="profile">
        <Helmet title="Notendur" />
        <section>
        <h1 className="title">Notendur</h1>
        <ul>
          {users.items.map((user) => {
            return (
              <User
                key={user.id}
                id={user.id}
                name={user.name}
              />
            )
          })}
        </ul>
        {page > 1 &&
          <Link to={{pathname: "/users", search: `?page=${Number(page) - 1}`}}><Button>{"<"} Til baka</Button></Link>
        }
        {users.items.length === 10 &&
          <Link to={{pathname: "/users", search: `?page=${Number(page) + 1}`}}><Button>Næsta síða ></Button></Link>
        }
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.allUsers.isFetching,
    users: state.allUsers.users,
    error: state.allUsers.error,
  }
}

export default connect(mapStateToProps)(Users);
