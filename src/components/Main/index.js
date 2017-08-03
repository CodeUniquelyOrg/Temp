import React, { Component } from 'react';          // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import Logout from 'components/Logout';
import HomePage from 'components/HomePage';
import Register from 'components/Auth/register';
import Login from 'components/Auth/login';
import Dashboard from 'components/Dashboard';
import NotFoundPage from 'components/NotFoundPage';

import RequireAuth from 'components/auth/require';

// Declaritive
const Main = () => (
  <Switch>

    <Route exact path = '/' component={HomePage} />
    <Route exact path = '/register' component={Register} />
    <Route exact path = '/login' component={Login} />

    <Route exact path = '/logout' component={RequireAuth(Logout)} />
    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />

    <Route component = {NotFoundPage} />

  </Switch>
);

export default Main;
