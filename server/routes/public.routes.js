//
// Authentication Routes - 'Publicly' (ANOYMOUSLY) accessible
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const controller = require('../controllers/auth.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  // Get address by line1 and Postcode
  router.route('/login').post(controller.login);

  router.route('/register').post(controller.register);

  router.route('/forgot').post(controller.forgot);

  // This router handles all routes starting with - /api/v1/auth
  console.log(`   ${apiRoot}/auth`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/auth`, router);
};
