// ==============================================================
// This file is a part of TAC Proactive Check Reporting REST API.
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2016 Cisco Systems, Inc.
//
// final route handler - requested route 'not found'
// ==============================================================

module.exports = function(app, options) {
  app.use((req, res, next) => {
    return res.status(options.status.NOT_FOUND).send({ error: 'Not found' });
  });
};
