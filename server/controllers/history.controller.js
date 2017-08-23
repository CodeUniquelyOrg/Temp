//
// Vehicle History Data Controller
//
module.exports = function(injectables) {

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const status = injectables.status;
  const async = injectables.async;

  // make sure the request delays for 500ms
  const timeTaken = 500;

  // reference the 'users' & 'history' Collections
  const Users = mongoose.model('users');
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

  function asyncGetHistory(vin, fromDate, toDate, callback){
    setTimeout(function() {
      const list = mockdata.map( node => {
        const date = new Date(node.magsensorhighdttm);
        if (vin == node.vehicleIdentifier && date >= fromDate && date <= toDate) {
          return node;
        }
      }).filter(x => x);
      // LOG
      console.log('QUERY RETURNED\n', list);
      callback(null,list);
    }, timeTaken);
  }

  // really needs to make a number of requests here...
  // lookup ALL vehicle registrations for user and get
  // the start and end dates of those various periods
  // of ownership and then in Async => request all the
  // various results and when complete aggregate them
  // into a single return array in desired format....

  // if users is NOT registered then JUST get the LAST
  // record that they can see

  function getByRegNumber(req, res, next) {

    // extract the registration number - ONLY going to be ONE (for now)
    const vin = parseInt(req.params.vin,10);

    const data = [
      {
        vehicleIdentifier: vin,
        history: [],
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

  function processHistoryResults(response) {
    // where the data is going to go
    const data = [];

    function getVehicle(vin) {
      // itterate data looking for vin
      let found;
      for(let i=0 ; i < data.length ; i++) {
        if ( data[i].vehicleIdentifier === vin) {
          found = data[i];
          break;
        }
      }
      if (!found) {
        found = {
          vehicleIdentifier: vin,
          history: [],
        };
        data.push(found);
      }
      return found;
    }

    // there may be more than one task that ran
    response.forEach( task => {

      let vehicle;

      // records in atask wil be for same vehicle
      task.forEach( record => {

        // dont care - just attach to the right vehicle record record
        vehicle = getVehicle(record.vehicleIdentifier);

        const dateTime = record.magsensorhighdttm;
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

        // just push them into the first record
        vehicle.history.push(driveOver);
      });
    });
    return data;
  }

  // get the history for the user
  function getMyHistory(req, res, next) {
    const user = req.user;

    // Auth will already have killed the request if user is null;

    // is this user registered
    let registeredUser = user.other && user.other.registeredUser || false;
    let termsAccepted = user.other && user.other.termsAccepted || false;

    // get the date and time now
    // const twoWeeks = 1000 * 60 * 60 * 24 * 14;
    // const now = new Date(new Date().getTime() - twoWeeks);
    const now = new Date();

    // The user must have at least one drive-over - in order to have got here !
    // get all the vehileIdentifers from the user
    const queries = user.registrations.map(reg => {
      return {
        vehicleIdentifier: reg.vehicleIdentifier,
        fromDate: new Date(reg.fromDate),
        toDate: reg.lastViewedDate ? new Date(reg.lastViewedDate) : now,
      };
    });

    const tasks = user.registrations.map(reg => {
      const vehicleIdentifier =reg.vehicleIdentifier;
      const fromDate = new Date(reg.fromDate);
      const toDate =reg.lastViewedDate ? new Date(reg.lastViewedDate) : now;
      return function(done) {
        asyncGetHistory(vehicleIdentifier, fromDate, toDate, done);
      };
    });

    async.parallel(tasks, (err, results) => {
      if (err) {
        console.log('ERROR IS\n', err); // eslint-disable-line no-console
        return next(err);
      }

      // send the response back
      const data = processHistoryResults(results);
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
    getMyHistory,
    getSavedData,
  };

};