import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { login } from '../../actions/auth';

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
    const { isFetching, user, type, message } = this.props;

    if (!isFetching) {
      if (user) {
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect } = this.state;
    const { message } = this.props;

    if (redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Helmet title='Innskráning' />
        <p>Innskráning</p>
        {message &&
          <p>{message.error}</p>
        }
        <form onSubmit={this.submit}>
          <input type="text" name="username" ref={this.usernameInput} />
          <input type="password" name="password" ref={this.passwordInput}/>
          <button>Submit</button>
        </form>
        <p><Link to="/register">Nýskrá</Link></p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    message: state.auth.message,
  }
}

export default withRouter(connect(mapStateToProps)(Login));
