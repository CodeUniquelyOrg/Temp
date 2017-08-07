// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
//   => Load the DB Schema with al the Models Here
// ==============================================================
module.exports = function models(injectables) {

  // load the 'shared' base Schema object
  const BaseSchema = require('./base')(injectables); // , util, increment);
  // const validations = require('./validations')(injectables);

  require('./model.users')('users', injectables, BaseSchema); // , validations);
};
