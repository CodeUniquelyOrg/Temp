//
// Tyre 'History' Routes
// http[s]://[host]:[port]/api/v1/vehicle/code
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const middleware = injectables.middleware;

  const controller = require('../controllers/vehicle.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  // deal with POST for ask for "vehicle/code"
  router.route('/code').post(controller.checkUserGivenCode);

  // router.route('/code/:code').get(controller.checkUserGivenCode);

  // This router handles all routes starting with - /api/v1/history
  console.log(`   ${apiRoot}/vehicle`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/vehicle`, router);
};
