//
// Auth Routes (AUTHENTICATED)
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const controller = require('../controllers/auth.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  // Get address by line1 and Postcode
  router.route('/logout').get(controller.logout);

  // This router handles all routes starting with - /api/v1/auth
  console.log(`   ${apiRoot}/auth`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/auth`, router);
};
