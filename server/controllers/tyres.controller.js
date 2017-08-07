//
// Tyre Data Controller
//
module.exports = function(injectables) {

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const status   = injectables.status;

  // reference the 'users' Collection
  // const Users = mongoose.model('users');
  const mockdata = require('../mock/tyre.json');

  function getByRegNumber(req, res, next) {
    res.json(mockdata);
  }

  return {
    getByRegNumber,
  };
};