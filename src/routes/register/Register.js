import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';

import { signup } from '../../actions/auth';

/* todo sækja actions frá ./actions */

import Button from '../../components/button';
import './Register.css';

class Register extends Component {

  state = { redirect: false };

  usernameInput = React.createRef();
  usernameLabel = React.createRef();

  passwordInput = React.createRef();
  passwordLabel = React.createRef();

  nameInput = React.createRef();
  nameLabel = React.createRef();

  componentDidMount() {
    this.usernameInput.current.focus();
  }

  submit = (e) => {
    e.preventDefault();
    const username = this.usernameInput.current.value;
    const password = this.passwordInput.current.value;
    const name = this.nameInput.current.value;
    
    const { dispatch } = this.props;
    dispatch(signup(name, username, password));
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, result, errors } = this.props;
    const { redirect } = this.state;
    
    if (!isFetching && !redirect) {

      this.usernameInput.current.classList.remove('wrong-input');
      this.usernameLabel.current.classList.remove('wrong-label');
      this.passwordInput.current.classList.remove('wrong-input');
      this.passwordLabel.current.classList.remove('wrong-label');
      this.nameInput.current.classList.remove('wrong-input');
      this.nameLabel.current.classList.remove('wrong-label');

      if (result.status === 201) {
        console.log('Tókst ad skra notanda');
        this.setState({ redirect: true });
      } else {
        errors.map((error) => {
          if (error.field === this.usernameInput.current.id) {
            this.usernameInput.current.classList.add("wrong-input");
            this.usernameLabel.current.classList.add('wrong-label');
          } else if (error.field === this.passwordInput.current.id) {
            this.passwordInput.current.classList.add("wrong-input");
            this.passwordLabel.current.classList.add('wrong-label');
          } else {
            this.nameInput.current.classList.add("wrong-input");
            this.nameLabel.current.classList.add('wrong-label');
          }
        });
      }
    }
  }

  render() {
    const { redirect } = this.state;
    const { errors = [] } = this.props;
    console.log(errors);
    

    if (redirect) {
      return (
        <div>
          <p>Nýskráning tókst</p>
          <p><Link to="/login">Innskráning</Link></p>
        </div>
      );
    }

    return (
      <div className="page">
        <Helmet title="Nýskráning" />
        <h1>Nýskráning</h1>
        <ul>
          {errors.map((error) => {
            return (<li key={error.field}>{error.message}</li>);
          })}
        </ul>
        <form className="loginForm">
          <div className="field">
            <label htmlFor="username" ref={this.usernameLabel}>Notendanafn: </label>
            <input type="text" name="username" className="field-input" id="username" ref={this.usernameInput}/>
          </div>
          <div className="field">
            <label htmlFor="password" ref={this.passwordLabel}>Lykilorð: </label>
            <input type="password" name="password" className="field-input" id="password" ref={this.passwordInput}/>
          </div>
          <div className="field">
            <label htmlFor="name" ref={this.nameLabel}>Nafn: </label>
            <input type="text"name="name" className="field-input" id="name" ref={this.nameInput}/>
          </div>
          <Button onClick={this.submit}>Submit</Button>
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
    errors: state.register.errors,
    success: state.register.success,
  }
  /* todo stilla redux ef það er notað */
}

export default withRouter(connect(mapStateToProps)(Register));
