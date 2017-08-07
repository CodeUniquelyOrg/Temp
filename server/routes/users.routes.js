//
// Auth Routes (AUTHENTICATED)
//
module.exports = function(injectables) {

  const router = new injectables.express.Router();
  const controller = require('../controllers/user.controller')(injectables);

  const apiRoot = injectables.config.server.apiRoot;

  // Get all users
  router.route('/').get(controller.get);

  // get a specific user by id
  // router.route('/:id').get(auth.isOwnRecord, controller.getById);
  // router.route('/me').get(controller.getById);

  router.route('/me').get(controller.getById);

  // This router handles all routes starting with - /api/v1/auth
  console.log(`   ${apiRoot}/users`); // eslint-disable-line no-console
  injectables.app.use(`${apiRoot}/users`, router);
};
