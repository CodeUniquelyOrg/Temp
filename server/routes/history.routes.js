//
// Tyre data Routes
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const controller = require('../controllers/history.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  router.route('/:reg').get(controller.getByRegNumber);

  // router.route('/:reg/detail').get(controller.getRegisteredAddress);

  // router.route('/:reg/images').get(controller.getOfficers);

  // This router handles all routes starting with - /api/v1/tyres
  console.log(`   ${apiRoot}/history`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/history`, router);
};
