import React from 'react';                                // eslint-disable-line no-unused-vars
import { BrowserRouter as Router, Route } from 'react-router-dom';  // eslint-disable-line no-unused-vars
import { Rediret, browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';                    // eslint-disable-line no-unused-vars

import App from 'components/App';
import NotFoundPage from 'components/NotFoundPage';
import HomePage from 'components/HomePage';
import Register from 'components/Auth/register';
import Login from 'components/Auth/login';
import Dashboard from 'components/Dashboard';

// use the HOC - RequireAuth
import RequireAuth from 'components/auth/require';

export default (
  <Router history={browserHistory}>
    <div>
      <Route path="**" component={App} />
      <Route path='/' exact component={HomePage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />

      <Route path="/dashboard" component={RequireAuth(Dashboard)} />

      <Route path="*" component={NotFoundPage} />
    </div>
  </Router>
);