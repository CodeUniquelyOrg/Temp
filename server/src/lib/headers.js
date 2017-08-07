// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Return RESPONSE Headers
// ===============================================================
module.exports = function(config) {
  return function handleRequest(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Authorization, Content-Type, x-auth');
    res.header('X-KidsRunFree-Version', config.version);
    next();
  };
};
