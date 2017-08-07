// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Support Functions Lib
// ==============================================================
module.exports = function(/* status */) {

  // Dont 'inject' this - make it a dependency of the LIB
  const status = require('http-status');

  // HTTP STATUS CODES
  function setUnauthorized(res, error) {
    if ( error ) {
      return res.sendStatus(status.UNAUTHORIZED).json(error);
    }
    return res.sendStatus(status.UNAUTHORIZED);
  }
  function setForbidden(res) {
    return res.sendStatus(status.FORBIDDEN);
  }
  function setBadRequest(res) {
    return res.sendStatus(status.BAD_REQUEST);
  }
  function setNotFound(res) {
    return res.sendStatus(status.NOT_FOUND);
  }
  function setCreated(res, results) {
    return res.status(status.CREATED).json(results);
  }

  function parseIntFromString(id) {
    return parseInt(id, 10);
  }

  return {
    status: status,
    unauthorized: setUnauthorized,
    forbidden: setForbidden,
    notFound: setNotFound,
    badRequest: setBadRequest,
    created: setCreated,
    intFromParam: parseIntFromString,
  };

};
