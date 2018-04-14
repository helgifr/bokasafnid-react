import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';

import { login } from '../../actions/auth';

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

/* todo tengja við redux */

const mapStateToProps = (state) => {
  return {
    type: state.auth.type,
    isFetching: state.auth.isFetching,
    result: state.auth.result,
    error: state.auth.error,
    success: state.auth.success,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(Login));
