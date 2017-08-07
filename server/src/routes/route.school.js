import { Router } from 'express';
import * as Controller from '../controllers/school.controller';
const router = new Router();

const apiRoot = '/schools';

// Get all Schools
router.route(apiRoot).get(Controller.getSchools);

// How many schools are there
router.route(`${apiRoot}/count`).get(Controller.getSchoolsCount);

// Get one school by id
router.route(`${apiRoot}/:id`).get(Controller.getSchool);

// Get one school by id => courses
router.route(`${apiRoot}/:id/courses`).get(Controller.getSchoolCourses);

// how many courses do a school have
router.route(`${apiRoot}/:id/courses/count`).get(Controller.getSchoolCoursesCount);

// Get one school by id => courses
router.route(`${apiRoot}/:id/courses/:name`).get(Controller.getSchoolCourseByName);

// Add a new school
router.route(apiRoot).post(Controller.addSchool);

// Delete a school by id
router.route(`${apiRoot}/:id`).delete(Controller.deleteSchool);

export default router;
