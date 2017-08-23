//
// Tyre 'History' Routes
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const middleware = injectables.middleware;

  const controller = require('../controllers/history.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  // jsut ask for "/history/me"
  router.route('/me').get(controller.getMyHistory);

  // Check the registration is one of my registrations ...
  router.param('vin', middleware.limitToOwnRegistrations);
  // request one regsitration - limited by the middleware above
  router.route('/:vin').get(controller.getByRegNumber);

  // This router handles all routes starting with - /api/v1/history
  console.log(`   ${apiRoot}/history`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/history`, router);
};
