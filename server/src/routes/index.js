// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// API Routes
// ==============================================================
module.exports = function(options) {

  const {
    app,
    support,
    // headers,
    // middleware,
    // auth,
    config,
  } = options;

  // configure allowed headers in client requests
  // app.use(headers);

  require('./route.favicon')(app, support);

  // api listing route
  require('./route.info')(app, config);

  // db metadata api functions
  // require('./route.meta')(app, support);

  // require('./route.me')(app, options);

  // require()
  // require('./route.auth')(app, options);

  // GATE 1: 'authorize' all API requests from now on ...
  // app.use(auth.authorize);

  // ---
  // require('./route.me')(app, options);

  // GATE 2: only people with accounts ...
  // app.use(auth.registeredOnly);

  require('./route.runner')(app, options);
  // require('./route.school')(app, options);
  // require('./route.session')(app, options);

  // augment req.user with any admin / teacher / parent / runner flags
  // app.use(options.roles);

  // GATE 3: only internal users & guest can call routes past here
  // app.use(auth.schoolOnly);

  // ---

  // GATE 4: Only Admin users can make this call
  // app.use(auth.adminOnly);

  // ---
  // require('./route.user')(app, options);

  // FINALLY - no matching route was found - 'not found' handler
  require('./route.404')(app, options);
};