module.exports = function(model) { // support, middleware) {

  // import Runner from '../models/runner';
  // import cuid from 'cuid';
  // import slug from 'limax';
  // import sanitizeHtml from 'sanitize-html';

  /**
   * Get all runners
   * @param req
   * @param res
   * @returns void
   */
  function getRunners(req, res) {
    model.find().sort('-created').exec((err, runners) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ runners });
    });
  }

  /**
   * Save a runner
   * @param req
   * @param res
   * @returns void
   */
  function addRunner(req, res) {
    // More checks required --- VALIDATE PAYLOAD FUNCTION
    // if (!req.body.runner.forname || !req.body.runner.surname) {
    //   res.status(403).end();
    // }

    const newRunner = new model(req.body.runner);

    // // Let's sanitize inputs
    // newRunner.title = sanitizeHtml(newRunner.title);
    // newRunner.name = sanitizeHtml(newRunner.name);
    // newRunner.content = sanitizeHtml(newRunner.content);
    // newRunner.slug = slug(newRunner.title.toLowerCase(), { lowercase: true });

    // geneate an ID for it ...
    // newRunner.id = cuid();

    newRunner.save((err, saved) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ runner: saved });
    });
  }

  /**
   * Get a single runner
   * @param req
   * @param res
   * @returns void
   */
  function getRunner(req, res) {
    model.findOne({ id: req.params.id }).exec((err, runner) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ runner });
    });
  }

  /**
   * Delete a runner
   * @param req
   * @param res
   * @returns void
   */
  function deleteRunner(req, res) {
    model.findOne({ id: req.params.id }).exec((err, runner) => {
      if (err) {
        res.status(500).send(err);
      }
      runner.remove(() => {
        res.status(200).end();
      });
    });
  }

  return {
    getRunners,
    addRunner,
    getRunner,
    deleteRunner,
  };

};
