// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// API Routes
// ==============================================================
module.exports = function(injectables) {

  const app = injectables.app;
  const auth = injectables.auth;

  console.log('\n\nSetting endpoints on:'); // eslint-disable-line no-console

  // require('./favicon.routes')(injectables);

  // Info Requests
  require('./info.route')(injectables);

  // ande requests for favIcon.ico
  require('./public.routes')(injectables);

  // Initialize Authentication Middleware
  app.use(auth.authorize);

  // routes that are only avaliable to authorized users
  require('./logout.route')(injectables);

  // 2nd level 'Gate' - you must also have these criteria
  // app.use(auth.registeredOnly);

  // 'users' stuff
  require('./users.routes')(injectables);

  // 'tyres' stuff
  require('./tyres.routes')(injectables);

  // 'history' stuff
  require('./history.routes')(injectables);

  // FINALLY - no matching route was found - 'not found' handler
  require('./notfound.route')(injectables);

  // 2nd level 'Gate' - you must also have these criteria
  // app.use(auth.managersOnly);

  // 2nd level 'Gate' - you must also have these criteria
  // app.use(auth.adminOnly);

  console.log('\n\n'); // eslint-disable-line no-console
};