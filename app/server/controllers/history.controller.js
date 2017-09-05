//
// Vehicle History Data Controller
//
module.exports = function(injectables) {

  // internal server libraries - should INJECT the whole library
  // const userLib = injectables.libs.userLib;
  const requestLib = require('../lib/async')(injectables);
  const historyLib = require('../lib/history')(injectables);
  const userLib = require('../lib/user')(injectables);

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const config = injectables.config;
  const status = injectables.status;
  const async = injectables.async;

  // reference the 'users' & 'history' Collections
  const Users = mongoose.model('users');
  const History = mongoose.model('history');

  function getVehicleIdentifier(req, res, next) {
    // const user = req.user;
    // const code = req.params.code;
    const code = req.body.code;
    // some DUMMY CODE HERE
    if (code === 'new') {
      requestLib.get('new',{ code }, done);
    }
  }

  // ======================================================
  // get the history for the user
  // actually making a mixed number of requests here...
  // Lookup ALL vehicle registrations for user and get
  // the start and end dates of those various periods
  // of ownership and then in Async => request all the
  // various results and when eveythig is complete
  // aggregate results into a single return array in the
  // desired format....
  //
  // n.b
  // If users is NOT termsAccepted then JUST get the LAST
  // data of the latest record that they can see ...
  // ======================================================
  function getMyHistory(req, res, next) {
    const user = req.user;

    // Auth will already have killed the request if user is null;

    // is this user registered
    let registeredUser = user.other && user.other.registeredUser || false;
    let termsAccepted = user.other && user.other.termsAccepted || false;

    // get the date and time now
    // const twoWeeks = 1000 * 60 * 60 * 24 * 14;
    // const now = new Date(new Date().getTime() - twoWeeks);
    const registrations = userLib.getAllRegistrations(user);
    const tasks = registrations.map(reg => {
      return function(done) {
        requestLib.get(`vehicle/${reg.vehicleIdentifier}`, { fromDate: reg.fromDate, toDate: reg.toDate }, done);
      };
    });

    async.parallel(tasks, (err, results) => {
      if (err) {
        console.log('ERROR IS\n', err); // eslint-disable-line no-console
        return next(err);
      }

      // reduce queries into smallest number of vehicle records
      const data = historyLib.combineResults(results);

      // send the response back
      res.json(data);
    });
  }

  // Just the last one
  function getMyLastestHistory(req, res, next) {
  }

  // registered drivers have data on local server for 'FASTER' access
  // GET busing Vechileidentifier
  function getSavedData(req, res, next) {
    const vin = parseInt(req.params.vin,10);

    const query = { vehicleIdentifier: vin };

    // find all the hsitroy records
    History.find(query, (err,records) => {
      if ( err) {
        return next(err);
      }
      next(null, records);
    });
  }

  return {
    getMyHistory,
    getSavedData,
  };

};