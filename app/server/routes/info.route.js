// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Request for info on the JSON API itself - Info API
// ==============================================================

module.exports = function(options) {

  const {
    app,
    config,
  } = options;

  const apiRoot = config.server.apiRoot;
  // const app = options.app;

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

  app.get(apiRoot, (req, res/* , next */) => {
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
              default:
                obj.access = func;
                break;
            }
          }

          endpoints.push(obj);
        }
      }
    }

    // sort the routes into alphabetical order
    const sorted = endpoints.sort(compare);

    return res.json({
      // name: config.name,
      version: config.version,
      // description: config.description,
      endpoints: sorted,
    });
  });
};
