import Model from '../models/session';
// import cuid from 'cuid';
// import slug from 'limax';
// import sanitizeHtml from 'sanitize-html';

/**
 * Get all Sessions
 * @param req
 * @param res
 * @returns void
 */
export function getSessions(req, res) {
  Model.find().sort('name').exec((err, records) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ records });
  });
}

/**
 * Save a Session
 * @param req
 * @param res
 * @returns void
 */
export function addSession(req, res) {
  // More checks required --- VALIDATE PAYLOAD FUNCTION
  // if (!req.body.session.forname || !req.body.session.surname) {
  //   res.status(403).end();
  // }

  const newSession = new Model(req.body.session);

  // // Let's sanitize inputs
  // newSession.title = sanitizeHtml(newSession.title);
  // newSession.name = sanitizeHtml(newSession.name);
  // newSession.content = sanitizeHtml(newSession.content);
  // newSession.slug = slug(newSession.title.toLowerCase(), { lowercase: true });

  // geneate an ID for it ...
  // newSession.id = cuid();

  newSession.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ session: saved });
  });
}

/**
 * Get a single Session
 * @param req
 * @param res
 * @returns void
 */
export function getSession(req, res) {
  Model.findOne({ id: req.params.id }).exec((err, record) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ record });
  });
}

/**
 * Delete a Session
 * @param req
 * @param res
 * @returns void
 */
export function deleteSession(req, res) {
  Model.findOne({ id: req.params.id }).exec((err, record) => {
    if (err) {
      res.status(500).send(err);
    }
    record.remove(() => {
      res.status(200).end();
    });
  });
}
