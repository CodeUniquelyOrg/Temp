import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';       // eslint-disable-line no-unused-vars

// import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
// import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

import HomePage from 'components/HomePage';
import Register from 'components/Auth/register';
import Login from 'components/Auth/login';
import Dashboard from 'components/Dashboard';
import NotFoundPage from 'components/NotFoundPage';

import RequireAuth from 'components/auth/require';

//  {this.props.children}

// Declaritive
const Main = () => (
  <Switch>

    <Route exact path = '/' component={HomePage} />

    <Route exact path = '/register' component={Register} />
    <Route exact path = '/login' component={Login} />

    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />

    <Route component = {NotFoundPage} />

  </Switch>
);

export default Main;

/*
export default class Main extends Component {
  render() {
    return (
      <Switch>

        <Route exact path = '/' component={HomePage} />

        <Route exact path = '/register' component={Register} />
        <Route exact path = '/login' component={Login} />

        <Route path = '/dashboard' component={RequireAuth(Dashboard)} />

        <Route component = {NotFoundPage} />

      </Switch>
    );
  }
}
*/