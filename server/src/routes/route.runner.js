// import { Router } from 'express';
// import * as Controller from '../controllers/runner.controller';
// const router = new Router();

// const apiRoot = '/runners';

// // Get all Posts
// router.route(apiRoot).get(Controller.getRunners);

// // Get one post by cuid
// router.route(`${apiRoot}/:id`).get(Controller.getRunner);

// // Add a new Post
// router.route(apiRoot).post(Controller.addRunner);

// // Delete a post by cuid
// router.route(`${apiRoot}/:id`).delete(Controller.deleteRunner);

// export default router;

module.exports = function(app, options) { // support, middleware) {

  const mw = options.middleware;

  // const router = new Router();
  const router = new options.express.Router();

  var apiRoot = options.config.server.apiRoot; //  app.get('apiRoot') + '/runners';

  const controller = require('../controllers/runner.controller')(null);
  if(!controller) {
    throw Error('Missing controller for ... ');
  }

  // =======================================
  // Server the API from here
  // =======================================
  // app.use('/api', runners);

  // Get all Runners
  router.route(apiRoot).get(mw.limitToAuthenticated, controller.getRunners);

  // Get one Runner by id
  router.route(`${apiRoot}/:id`).get(mw.limitToAuthenticated, controller.getRunner);

  // Add a new Runner
  router.route(apiRoot).post(mw.limitToAuthenticated, controller.addRunner);

  // Update an existing Runner
  router.route(`${apiRoot}/:id`).put(mw.limitToAuthenticated, mw.rejectAlteredId('id'), controller.addRunner);

  // Delete a Runner by id
  router.route(`${apiRoot}/:id`).delete(mw.limitToAuthenticated, controller.deleteRunner);

  app.use('/api', router);

  /*
  // ================================================================
  // Request all the investiations belonging to a given customer
  // ================================================================
  app.get(apiPrefix + '/customer/:cid(\\d+)', mw.limitToAuthenticated, (req, res, next) => {
    var cid = support.id(req.params.cid);
    var internal = req.user.internal;
    investigations.getVisibleInvestigations(cid, internal, support.processResults(res, next));
  });

  // ================================================================
  // Request a single investigation by a specific id
  // ================================================================
  app.get(apiPrefix + '/:iid(\\d+)', mw.limitToAuthenticated, (req, res, next) => {
    var iid = support.id(req.params.iid);
    var user = req.user;
    investigations.getSingleInvestigation(iid, user, support.processByIdResults(res, next));
  });

  // ================================================================
  // Post a new Investigation (used on customer page)
  // ================================================================
  app.post(apiPrefix, mw.limitToAuthenticated, (req, res, next) => {
    investigations.writeInvestigation(req.body, support.processPostResults(res, next));
  });

  // ================================================================
  // Update an existing investigation record
  // ================================================================
  app.put(apiPrefix + '/:iid(\\d+)', mw.limitToAuthenticated, mw.rejectAlteredId('iid'), (req, res, next) => {
    var iid = support.id(req.params.iid);
    var user = req.user;
    investigations.updateInvestigation(iid, user, req.body, support.processPutResults(res, next));
  });
  */
};
