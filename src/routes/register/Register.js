import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { signup } from '../../actions/auth';

/* todo sækja actions frá ./actions */

import './Register.css';

class Register extends Component {

  state = { redirect: false };

  usernameInput = null;
  setUsernameInput = element => {
    this.usernameInput = element;
  }

  passwordInput = null;
  setPasswordInput = element => {
    this.passwordInput = element;
  }

  nameInput = null;
  setNameInput = element => {
    this.nameInput = element;
  }

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.value;
    const password = this.passwordInput.value;
    const name = this.nameInput.value;
    const { dispatch } = this.props;
    dispatch(signup(name, username, password));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, result, type } = this.props;
    const { redirect } = this.state;
    
    if (!isFetching && !redirect) {
      if (result.status === 401) {
        console.log('Wrong info');
      } 
      if(result.status === 400){
        console.log(result.result.error);
      }
        else {
        console.log('Tókst ad skra notanda');
        
        this.setState({ redirect: true });
      }
    }
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return (
        <div>
          <p>Innskráning tókst</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
    );
  }  

    return (
      <div>
        <p>Nýskráning</p>
        <form>
          <p>Username:</p>
          <input type="text" name="username" ref={this.setUsernameInput}/>
          <p>Password:</p>
          <input type="password" name="password" ref={this.setPasswordInput}/>
          <p>Name:</p>
          <input type="text"name="name" ref={this.setNameInput}/>
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

export default withRouter(connect(mapStateToProps)(Register));
