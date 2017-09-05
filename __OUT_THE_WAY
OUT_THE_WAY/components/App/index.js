import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { Route, Switch } from 'react-router-dom';  // eslint-disable-line no-unused-vars

import injectTapEventPlugin from 'react-tap-event-plugin';

// import Logout from 'containers/Logout';
import Register from 'containers/Register';
// import Login from 'containers/Login';
// import Dashboard from 'containers/Dashboard';
// import Initial from 'containers/Initial';
// import Terms from 'containers/Terms';

// import NotFoundPage from 'containers/NotFoundPage';
// import RequireAuth from 'components/RequireAuth';

// UGLY INJECT To deal with Touch Screens, until React Supports them natively
// - slated for (V1.0.0)
injectTapEventPlugin();

// Declaritive
const App = () => (
  <Switch>
    <Route exact path = '/' component={Register} />
  </Switch>
);

/*
    <Route       path = '/register/:code' component={Register} />
    <Route exact path = '/login' component={Login} />
    <Route exact path = '/initial' component={Initial} />
    <Route exact path = '/logout' component={RequireAuth(Logout)} />
    <Route path = '/terms' component={RequireAuth(Terms)} />
    <Route path = '/dashboard' component={RequireAuth(Dashboard)} />
    <Route component = {NotFoundPage} />
*/

export default App;
