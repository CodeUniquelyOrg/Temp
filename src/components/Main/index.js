import React, { Component } from 'react';          // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import Logout from 'pages/Logout';
// import HomePage from 'pages/HomePage';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';
import NotFoundPage from 'pages/NotFoundPage';

import RequireAuth from 'components/RequireAuth';

// Declaritive
const Main = () => (
  <Switch>

    <Route exact path = '/' component={Login} />
    <Route exact path = '/register' component={Register} />
    <Route exact path = '/login' component={Login} />

    <Route exact path = '/logout' component={RequireAuth(Logout)} />
    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />

    <Route component = {NotFoundPage} />

  </Switch>
);

export default Main;
