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
    const registration = req.params.reg || '';

    const data = [
      {
        registration: registration,
        history: [
        ]
      }
    ];

    // get the data
    asyncDataRequest( mockdata, response => {

      response.forEach( record => {
        const dateTime = record.magsensorhighdttm;
        const plate = record.plate;
        const tyres = record.t;

        // if(plate !== registration) {
        //    skip the record - its not the same plate
        // }

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
      });

      // send the response back
      res.json(data);
    });
  }

  return {
    getByRegNumber,
  };

};