//
// Vehicle History Data Controller
//
module.exports = function(injectables) {

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const status   = injectables.status;

  // make sure the request delays for 500ms
  const timeTaken = 500;

  // reference the 'users' Collection
  const History = mongoose.model('history');

  // reference the 'users' Collection
  // const Users = mongoose.model('users');
  // const mockdata = require('../mock/history.json');
  const mockdata = require('../mock/serverHistory.json');

  function asyncDataRequest( data, callback ){
    setTimeout(function() {
      callback(data);
    }, timeTaken);
  }

  function getByRegNumber(req, res, next) {

    // extract the registration number - ONLY going to be ONE (for now)
    const vin = parseInt(req.params.vin,10);

    const data = [
      {
        vehicleIdentifier: vin,
        history: [
        ]
      }
    ];

    // get the data
    asyncDataRequest( mockdata, response => {

      response.forEach( record => {
        const dateTime = record.magsensorhighdttm;
        const identifier = record.vehicleIdentifier;

        // only take entries that match he plate
        if (vin === record.vehicleIdentifier) {

          const tyres = record.t;

          const readings = tyres.map(tyre => {
            return {
              id: `${tyre.axleno}${tyre.tyreno}`,
              pressure: parseFloat(tyre.pressurekpa || 0),
              depth: parseFloat(tyre.treaddepth || -1),
              good: tyre.treaddepthwithgoodreadings || false,
            };
          });

          const driveOver = {
            timestamp: dateTime,
            tyres: readings,
          };

          // just pust them into the first record
          data[0].history.push(driveOver);
        }
      });

      // send the response back
      res.json(data);
    });
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
    getByRegNumber,
    getSavedData,
  };

};