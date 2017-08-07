//
// Tyre data Routes
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const controller = require('../controllers/tyres.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  router.route('/:reg').get(controller.getByRegNumber);

  // router.route('/:reg/detail').get(controller.getRegisteredAddress);

  // router.route('/:reg/images').get(controller.getOfficers);

  // This router handles all routes starting with - /api/v1/tyres
  injectables.app.use(`${apiRoot}/tyres`, router);
}