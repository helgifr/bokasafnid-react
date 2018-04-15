import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { login } from '../../actions/login';

/* todo sækja actions frá ./actions */

import './Login.css';

class Login extends Component {

  state = { redirect: false };

  usernameInput = React.createRef();

  passwordInput = React.createRef();

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.current.value;
    const password = this.passwordInput.current.value;
    const { dispatch } = this.props;
    console.log(username, password);

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
    type: state.login.type,
    isFetching: state.login.isFetching,
    result: state.login.result,
    error: state.login.error,
    success: state.login.success,
  }
}

export default withRouter(connect(mapStateToProps)(Login));
