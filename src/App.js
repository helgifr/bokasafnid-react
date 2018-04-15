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
/* todo fleiri routes */

import './App.css';

class App extends Component {

  state = {
    loading: true,
    authenticated: null,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(checkAuth());
  }

  componentDidUpdate(prevProps, prevState) {
    const { isFetching, result } = this.props;
    const { authenticated } = this.state;

    if (!isFetching && authenticated === null) {
      if (result.status === 401) {
        this.setState({ authenticated: false, loading: false });
      } else {
        this.setState({ authenticated: true, loading: false });
      }
    }
  }

  render() {
    const { isFetching, token, error } = this.props;
    const { loading, authenticated } = this.state;

    if (loading) {
      return (<p>Sæki gögn...</p>);
    }

    return (
      <main className="main">
        <Helmet defaultTitle="Bókasafnið" titleTemplate="%s – Bókasafnið" />

        <Header />

        <div className="main__content">
          <Switch location={this.props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/books" exact component={Books} />
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
    type: state.auth.type,
    isFetching: state.auth.isFetching,
    result: state.auth.result,
    error: state.auth.error,
  }
}

export default withRouter(connect(mapStateToProps)(App));
