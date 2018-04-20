import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';

import Search from '../search';
import Button from '../button';

import './Header.css';
import { logoutUser } from '../../actions/auth';

class Header extends Component {
  state = { loading: true };

  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch()
  }

  signOut = (e) => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  }

  signedIn(user) {
    const { name, image } = this.props.user;
    let src;
    if (image) {
      src = image;
    } else {
      src = "/profile.jpg";
    }
    return (
      <div className="user">
        <img src={src} alt="profile" />
        <div className="info">
          <Link to="/profile">{name}</Link>
          <Button onClick={this.signOut}>Útskrá</Button>
        </div>
      </div>
    );
  }

  

  render() {
    const { user } = this.props;
    console.log(user);
    
    let logged;
    if (user) {
      logged = this.signedIn(user);
    } else {
      logged = (<Link to="/login">Innskráning</Link>);
    }

    return (
      <header className="header">
        <h1 className="header__heading"><Link to="/">Bókasafnið</Link></h1>

        <Search />

        {logged}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default connect(mapStateToProps)(Header);