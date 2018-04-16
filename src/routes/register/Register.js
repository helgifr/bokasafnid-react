import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { signup } from '../../actions/auth';

/* todo sækja actions frá ./actions */

import './Register.css';

class Register extends Component {

  state = { redirect: false };

  usernameInput = React.createRef();

  passwordInput = React.createRef();

  nameInput = React.createRef();

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.current.value;
    const password = this.passwordInput.current.value;
    const name = this.nameInput.current.value;
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
          <p>Nýskráning tókst</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    return (
      <div>
        <p>Nýskráning</p>
        <form>
          <p>Username:</p>
          <input type="text" name="username" ref={this.usernameInput}/>
          <p>Password:</p>
          <input type="password" name="password" ref={this.passwordInput}/>
          <p>Name:</p>
          <input type="text"name="name" ref={this.nameInput}/>
          <button onClick={this.submit}>Submit</button>
        </form>
      </div>
    );
  }
}

/* todo tengja við redux */

const mapStateToProps = (state) => {
  return {
    type: state.register.type,
    isFetching: state.register.isFetching,
    result: state.register.result,
    error: state.register.error,
    success: state.register.success,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(Register));
