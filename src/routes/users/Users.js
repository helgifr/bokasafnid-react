import React, { Component } from 'react';

import { connect } from 'react-redux';

import Helmet from 'react-helmet';


import { Link } from 'react-router-dom';

import { fetchUsers } from '../../actions/allUsers';

import queryString from 'query-string';

import './Users.css';


import User from '../../components/user';

class Users extends Component {

  state = {
    loading: true,
  }

async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchUsers(""));
    this.setState({ loading: false });
  }
  render() {
    const { loading } = this.state;
    const { users } = this.props;

    

    if (loading) {
      return (
        <p>Sæki notendur...</p>
      );
    }

    return (
      <div className="profile">
        <section>
        <h1 className="title">Notendur</h1>
        <ul>
          {users.items.map((user) => {
            return (
              <ul className="user">
                <User
                  key={user.id}
                  id={user.id}
                  name={user.name}
                />
              </ul>
            )
          })}
        </ul>
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
