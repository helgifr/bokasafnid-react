import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUsers } from '../../actions/allUsers';
import Helmet from 'react-helmet';

class UserPage extends Component {

  state = { loading: true };

  info(user) {
    const { name, image } = user;
    let src;
    if (image) {
      src = image;
    } else {
      src = "/profile.jpg";
    }
    return (
      <div className="user">
        <img src={src} alt="profile picture" />
        <p className="name"> {name} </p>
        <div className="info">

        </div>
      </div>
    );
  }

  async componentDidMount() {
    const { dispatch, match } = this.props;
    const { user } = match.params;
    await dispatch(fetchUsers(user));
    this.setState({ loading: false });
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
      <section>
        <Helmet title={user.name} />
        {this.info(user)}
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.allUsers.isFetching,
    user: state.allUsers.users,
    error: state.allUsers.error,
  }
}

export default connect(mapStateToProps)(UserPage);