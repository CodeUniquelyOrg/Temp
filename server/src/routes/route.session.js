import { Router } from 'express';
import * as Controller from '../controllers/session.controller';
const router = new Router();

const apiRoot = '/sessions';

// Get all Posts
router.route(apiRoot).get(Controller.getSessions);

// Get one post by cuid
router.route(`${apiRoot}/:id`).get(Controller.getSession);

// Add a new Post
router.route(apiRoot).post(Controller.addSession);

// Delete a post by cuid
router.route(`${apiRoot}/:id`).delete(Controller.deleteSession);

export default router;
