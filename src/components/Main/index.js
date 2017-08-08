import React, { Component } from 'react';          // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import Logout from 'pages/Logout';
// import HomePage from 'pages/HomePage';
import Register from 'pages/Register';
import Login from 'pages/Login';

import Terms from 'pages/Terms';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';

import NotFoundPage from 'pages/NotFoundPage';
import RequireAuth from 'components/RequireAuth';

// Declaritive
const Main = () => (
  <Switch>

    <Route exact path = '/' component={Login} />
    <Route exact path = '/register' component={Register} />
    <Route exact path = '/login' component={Login} />

    <Route exact path = '/logout' component={RequireAuth(Logout)} />

    <Route path = '/terms' component={RequireAuth(Terms)} />
    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />
    <Route path = '/settings' component={RequireAuth(Settings)} />

    <Route component = {NotFoundPage} />

  </Switch>
);

export default Main;

// if the user is authenticated - get the user info (ut only - 1 time request)?????
