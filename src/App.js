import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Books from './routes/books';
import Register from './routes/register';
import Book from './routes/book';
import NewBook from './routes/newBook';
import Users from './routes/users';
import UserPage from './routes/userPage';
import EditBook from './routes/editBook';

import './App.css';

class App extends Component {
  static propTypes = {
    authenticated: PropTypes.bool,
  }

  render() {
    const authenticated = this.props.isAuthenticated;

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/books" exact component={Books} />
            <UserRoute path="/books/new" exact authenticated={authenticated} component={NewBook} />
            <UserRoute path="/books/:book" exact authenticated={authenticated} component={Book} />
            <UserRoute path="/books/:book/edit" authenticated={authenticated} component={EditBook} />
            <UserRoute path="/profile" authenticated={authenticated} component={Profile} />
            <UserRoute path="/users" exact authenticated={authenticated} component={Users} />
            <UserRoute path="/users/:user" exact authenticated={authenticated} component={UserPage} />
           
            {/* todo fleiri route */}
            <Route component={NotFound} />
          </Switch>
        </div>

      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default withRouter(connect(mapStateToProps)(App));
