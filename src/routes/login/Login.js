import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { login } from '../../actions/auth';

import Button from '../../components/button';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  state = { redirect: false };

  usernameInput = React.createRef();

  passwordInput = React.createRef();

  componentDidMount() {
    this.usernameInput.current.focus();
  }

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.current.value;
    const password = this.passwordInput.current.value;
    const { dispatch } = this.props;
    dispatch(login(username, password));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, isAuthenticated, type, message } = this.props;

    if (!isFetching) {
      if (isAuthenticated) {
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect } = this.state;
    const { message, location } = this.props;

    if (redirect) {
      try {
        const { pathname } = location.state.from;
        return <Redirect to={pathname} />
      } catch (e) {
        return <Redirect to="/" />
      }
    }
    return (
      <div className="loginPage">
        <Helmet title='Innskráning' />
        <h1 className="header__heading">Innskráning</h1>
        {message &&
          <p>{message.error}</p>
        }
        <form onSubmit={this.submit} className="loginForm">
          <div className="field">
            <label htmlFor="username">Notendanafn: </label>
            <input type="text" name="username" className="field-input" id="username" ref={this.usernameInput} />
          </div>
          <div className="field">
            <label htmlFor="password">Lykilorð: </label>
            <input type="password" name="password" className="field-input" id="password" ref={this.passwordInput}/>
          </div>
          <Button>Innskrá</Button>
        </form>
        <p><Link to="/register">Nýskráning</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    message: state.auth.message,
  }
}

export default withRouter(connect(mapStateToProps)(Login));
