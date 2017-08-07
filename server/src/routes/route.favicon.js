// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Kids Run Free.
// Serve requests for the Favicon API
// ==============================================================
module.exports = function(app, support) {
  var apiPrefix = '/favicon.ico';
  app.get(apiPrefix, (req, res/* , next */) => {
    res.writeHead(support.status.OK, { 'Content-Type': 'image/x-icon' });
    res.end();
    return;
  });
};
