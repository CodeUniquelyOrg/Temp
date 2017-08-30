import React, { Component } from 'react';          // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';  // eslint-disable-line no-unused-vars

// import HomePage from 'pages/HomePage';
// import Settings from 'pages/Settings';
// import Kiosk from 'pages/Kiosk';

import Logout from 'pages/Logout';
import Register from 'pages/Register';
import Login from 'pages/Login';
import Dashboard from 'pages/Dashboard';

import Initial from 'pages/Initial';
import Terms from 'pages/Terms';

import NotFoundPage from 'pages/NotFoundPage';
import RequireAuth from 'components/RequireAuth';

//
// Need to make Requests on behalf of pages and bind the state
// to a HOC state view and then pass than into each component
//                         ??????
//

// import UserStore from 'components/UserStore' ;
// <Route exact path = '/kiosk' component={Kiosk} />

// Declaritive
const Main = () => (
  <Switch>

    <Route exact path = '/' component={Login} />
    <Route exact path = '/login' component={Login} />

    <Route exact path = '/register' component={Register} />
    <Route exact path="/register/:code" component={Register} />

    <Route exact path = '/initial' component={Initial} />

    <Route exact path = '/logout' component={RequireAuth(Logout)} />
    <Route path = '/terms' component={RequireAuth(Terms)} />
    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />

    <Route component = {NotFoundPage} />

  </Switch>
);

export default Main;

// if the user is authenticated - get the user info (but only - 1 time request)?????
