import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Route, NavLink, Link, Switch, withRouter } from 'react-router-dom'

import UserRoute from './components/user-route';
import Header from './components/header';

import { checkAuth } from './actions/auth';

import Home from './routes/home';
import Login from './routes/login';
import Profile from './routes/profile';
import NotFound from './routes/not-found';
import Books from './routes/books';
import Register from './routes/register';
import Book from './routes/book';
import NewBook from './routes/newBook';

/* todo fleiri routes */

import './App.css';

class App extends Component {
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
            <UserRoute path="/profile" authenticated={authenticated} component={Profile} />
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
