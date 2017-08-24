//
// Vehicle History Data Controller
//
module.exports = function(injectables) {

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const config = injectables.config;
  const status = injectables.status;
  const agent = injectables.agent;
  const async = injectables.async;
  const path = injectables.path;
  const fs = injectables.fs;

  // make sure the request delays for 250ms per request
  const timeTaken = 250;

  // API key used for security between "driver portal" and webApi
  const apiKey = config.auth.secret;

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
      callback(null,list);
    }, timeTaken);
  }

  // ASYNC - Dynamically load the JSON response from a file on disk
  // const mockdata = require('../mock/history.json');
  const loadMockData = (url, params, callback) => {
    const name = url.replace(/\//g, '-');
    const file = path.resolve(`${config.mocks.path}/${name}.json`);
    // open the file as 'utf-8'
    fs.readFile(file, 'utf8', (err, contents) => {
      if (err) {
        return callback(err);
      }
      try {
        const json = JSON.parse(contents);
        callback(null,json);
      } catch(e) {
        callback(e);
      }
    });
  };

  // ASYNC - SECURELY request the data from WebApi
  function makeRequest(url, params, callback) {
    agent('GET', url)
      .auth(apiKey, '')
      .accept('application/json')
      .query(params)
      .end(callback);
  }

  // function getByRegNumber(req, res, next) {
  //   // extract the registration number - ONLY going to be ONE (for now)
  //   const vin = parseInt(req.params.vin,10);
  //   const data = [
  //     {
  //       vehicleIdentifier: vin,
  //       history: [],
  //     }
  //   ];
  //
  //   // get the data
  //   asyncDataRequest( mockdata, response => {
  //     response.forEach( record => {
  //       const dateTime = record.magsensorhighdttm;
  //       const identifier = record.vehicleIdentifier;
  //
  //       // only take entries that match he plate
  //       if (vin === record.vehicleIdentifier) {
  //         const tyres = record.t;
  //         const readings = tyres.map(tyre => {
  //           return {
  //             id: `${tyre.axleno}${tyre.tyreno}`,
  //             pressure: parseFloat(tyre.pressurekpa || 0),
  //             depth: parseFloat(tyre.treaddepth || -1),
  //             good: tyre.treaddepthwithgoodreadings || false,
  //           };
  //         });
  //
  //         const driveOver = {
  //           timestamp: dateTime,
  //           tyres: readings,
  //         };
  //
  //         // just pust them into the first record
  //         data[0].history.push(driveOver);
  //       }
  //     });
  //
  //     // send the response back
  //     res.json(data);
  //   });
  // }

  // All requests for data go via this function from now on
  const request = ( path, params, callback) => {
    if ( config.webapi.offline ) {
      loadMockData(path, params, callback);
    } else {
      // SuperAgent( ... );
      // build the request URL
      const url = `${config.webapi.apiRoot}/path`;
      agent('GET', url)
        .auth(apiKey, '')
        .accept('application/json')
        .query(params)
        .end(callback);
    }
  };

  // ======================================================
  // Combine the various queries into same vehicles
  // ======================================================
  function combineHistoryResults(response) {
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

  // ***
  // should seriously start looking at a LIB of functions for some of this
  // ***
  function getVehicleIdentifier(req, res, next) {
    const user = req.user;
    // const code = req.params.code;
    const code = req.body.code;

    // request( API, )

    // some DUMMY CODE HERE
    if (code === 'newCar001') {
      //
    }
  }

  function getMyLastestHistory(req, res, next) {
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
    const now = new Date();

    // The user must have at least one drive-over - in order to have got here !
    // get all the vehileIdentifers from the user
    // const queries = user.registrations.map(reg => {
    //   return {
    //     vehicleIdentifier: reg.vehicleIdentifier,
    //     fromDate: new Date(reg.fromDate),
    //     toDate: reg.lastViewedDate ? new Date(reg.lastViewedDate) : now,
    //   };
    // });

    const tasks = user.registrations.map(reg => {
      const vehicleIdentifier =reg.vehicleIdentifier;
      const fromDate = new Date(reg.fromDate);
      const toDate = reg.lastViewedDate ? new Date(reg.lastViewedDate) : now;
      return function(done) {
        request(`vehicle/${vehicleIdentifier}`, { fromDate, toDate }, done);
        // asyncGetHistory(vehicleIdentifier, fromDate, toDate, done);
      };
    });

    async.parallel(tasks, (err, results) => {
      if (err) {
        console.log('ERROR IS\n', err); // eslint-disable-line no-console
        return next(err);
      }

      // reduce queries into smallest number of vehicle records
      const data = combineHistoryResults(results);

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
    // getByRegNumber,
    getMyHistory,
    getSavedData,
  };

};