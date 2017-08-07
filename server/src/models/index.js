// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// <Load all DB Models Here>
// ==============================================================
module.exports = function models(mongoose) {
  const BaseSchema = require('./base')(mongoose); // , util, increment);
  // const validations = require('./validations')(mongoose);

  require('./model.runner')('Runner', mongoose, BaseSchema);   // , validations);
  require('./model.school')('School', mongoose, BaseSchema);   // , validations);
  require('./model.session')('Session', mongoose, BaseSchema); // , validations);
  require('./model.user')('User', mongoose, BaseSchema); // , validations);
};
