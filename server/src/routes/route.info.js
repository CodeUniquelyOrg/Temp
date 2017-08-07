// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Kids Run Free.
// Request for info on the JOSN API itself - Info API
// ==============================================================

module.exports = function(app, config) {

  function compare(a, b) {
    if (a.url < b.url)
      return -1;
    if (a.url > b.url)
      return 1;
    // now we have the same URL - check the method
    if (a.method < b.method)
      return -1;
    if (a.method > b.method)
      return 1;
    return 0;
  }

  // var apiPrefix = config.server.apiRoot; // app.get('apiRoot');
  // app.get(apiPrefix, (req, res, next) => {

  app.get(config.server.apiRoot, (req, res/* , next */) => {
    var routes = app._router.stack;
    var endpoints = [];

    for (var key in routes) {
      if (routes.hasOwnProperty(key)) {
        var val = routes[key];
        if (val.route && val.route.path.indexOf('favicon') === -1) {
          val = val.route;
          var obj = {
            method: val.stack[0].method,
            url: val.path,
          };

          if (val.stack[0].name) {
            const func = val.stack[0].name;

            switch (func) {
              case '<anonymous>':
                obj.access = 'ANONYMOUS';
                break;
              case 'limitToAuthenticated':
                obj.access = 'AUTHENTICATED USERS ONLY';
                break;
              case 'limitToSchool':
                obj.access = 'SCHOOL ONLY';
                break;
              case 'limitToParent':
                obj.access = 'PARENT ONLY';
                break;
              case 'limitToAdmin':
                obj.access = 'ADMIN USERS ONLY';
                break;
              default:
                obj.access = func;
                break;
            }
          }

          // obj[val.stack[0].method] = [val.path, val.path ];
          // obj[val.stack[0].method] = /* [ */ val.path /* ] */;
          endpoints.push(obj);
        }
      }
    }

    // sort the routes into alphabetical order
    const sorted = endpoints.sort(compare);

    return res.json({
      name: config.name,
      version: config.version,
      description: config.description,
      endpoints: sorted,
    });
  });
};
