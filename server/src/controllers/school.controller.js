import Model from '../models/school';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

/**
 * Get all Schools
 * @param req
 * @param res
 * @returns void
 */
export function getSchools(req, res) {
  Model.find().sort('name').exec((err, schools) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ schools });
  });
}

export function getSchoolsCount(req, res) {
  Model.count().exec((err, count) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ count });
  });
}

/**
 * Save a School
 * @param req
 * @param res
 * @returns void
 */
export function addSchool(req, res) {
  // More checks required --- VALIDATE PAYLOAD FUNCTION
  // if (!req.body.school.forname || !req.body.school.surname) {
  //   res.status(403).end();
  // }

  const newSchool = new Model(req.body.school);

  // // Let's sanitize inputs
  // newRunner.title = sanitizeHtml(newRunner.title);
  // newRunner.name = sanitizeHtml(newRunner.name);
  // newRunner.content = sanitizeHtml(newRunner.content);
  // newRunner.slug = slug(newRunner.title.toLowerCase(), { lowercase: true });

  // geneate an ID for it ...
  // newSchool.id = cuid();

  newSchool.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ school: saved });
  });
}

/**
 * Get a single School
 * @param req
 * @param res
 * @returns void
 */
export function getSchool(req, res) {
  Model.findOne({ id: req.params.id }).exec((err, school) => {
    if (err) {
      res.status(500).send(err);
    }

    // if school === null / undefined => 404 - not found

    res.json({ school });
  });
}

// /${apiRoot}/:id/courses
export function getSchoolCourses(req, res) {
  Model.findOne({ id: req.params.id }).sort('name').exec((err, school) => {
    if (err) {
      res.status(500).send(err);
    }
    const courses = school.courses;
    res.json({ courses });
  });
}

export function getSchoolCoursesCount(req, res) {
  Model.findOne({ id: req.params.id }).sort('name').exec((err, school) => {
    if (err) {
      res.status(500).send(err);
    }
    const count = school.courses ? school.courses.length : 0;
    res.json({ count });
  });
}

export function getSchoolCourseByName(req, res) {
  Model.findOne({ id: req.params.id }).sort('name').exec((err, school) => {
    if (err) {
      res.status(500).send(err);
    }
    const match = req.params.name.replace(/\+/g, ' ');
    const courses = school.courses.filter(m => m.name === match);
    res.json({ courses });
  });
  // { $and: [ { "id": 50 }, { "courses.name": "Course 2" } ] }
}

/**
 * Delete a School
 * @param req
 * @param res
 * @returns void
 */
export function deleteSchool(req, res) {
  Model.findOne({ id: req.params.id }).exec((err, school) => {
    if (err) {
      res.status(500).send(err);
    }
    school.remove(() => {
      res.status(200).end();
    });
  });
}
