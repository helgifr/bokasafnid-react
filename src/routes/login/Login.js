import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../../actions/login';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  state = { redirect: false };

  usernameInput = null;
  setUsernameInput = element => {
    this.usernameInput = element;
  }

  passwordInput = null;
  setPasswordInput = element => {
    this.passwordInput = element;
  }

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    const { dispatch } = this.props;

    dispatch(login(username, password));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, result, type } = this.props;

    if (!isFetching) {
      if (result.status === 401) {
        console.log('Wrong login info');
      } else {
        const { token } = result.result;
        window.localStorage.setItem('token', token);
        this.setState({ redirect: true });
        
      }
    }
  }

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (
      <div>
        <p>Innskráning</p>
        <form>
          <input type="text" name="username" ref={this.setUsernameInput}/>
          <input type="password" name="password" ref={this.setPasswordInput}/>
          <button onClick={this.submit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    type: state.login.type,
    isFetching: state.login.isFetching,
    result: state.login.result,
    error: state.login.error,
    success: state.login.success,
  }
}

export default withRouter(connect(mapStateToProps)(Login));
