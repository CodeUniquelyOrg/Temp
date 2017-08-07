// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Load any Dummy Data into Mongooose if Required
// ==============================================================
module.exports = function shell(injectables, callback) {

  const async = injectables.async;
  const mongoose = injectables.mongoose;

  function dropCollections(done) {
    const collections = Object.keys(mongoose.connection.collections);
    async.forEach(collections, (name,cb) => {

      if (name === 'identitycounters') {
        return cb();
      }

      const collection = mongoose.connection.collections[name];

      console.log('Dropping ' + name);
      try {
        // mongoose.model(name).resetCount( err => {
        //   if (err) {
        //     return cb(err);
        //   }
          collection.drop( () => {
            cb();
          });
        // });
      } catch(e) {
        console.log(e);
        cb();
      }
    }, done);
  }


  function convertPSI(psi) {
    return psi * 6.8947573;
  }

  function convertBar(bar) {
    return bar * 100;
  }

  function loadUsers(done) {

    // get the Schema models
    const dbCollection = mongoose.model('users'); // require('../models/model.user')();

    // Get the 'fixture' data
    const mockUsers = require('./users.json');

    // Inject the data if no data records exist
    dbCollection.count().exec((err, count) => {
      if (err) {
        return done(err);
      }
      if (count > 0) {
        return done(null, null);
      }

      const data = mockUsers.users;
      if (!data || data.length === 0) {
        return done(null, null);
      }

      // *** ENCRYPT THE DATA IN PASSWORD ***

      dbCollection.create(data, (error) => {
        if (error) {
          console.log('USERS ERROR ', error);  // eslint-disable-line no-console
          return done(error);
        }

        console.log('ADDED USERS'); // eslint-disable-line no-console
        return done();
      });
    });
  }

  // if (config.dropDatabase) {
  // } else {
  // }

  // load all the data - Async
  async.waterfall([
    // (cb1) => {
    //   dropCollections(cb1);
    // },
    (cb1) => {
      loadUsers(cb1);
    },
    // (cb1) => {
    //   loadConfig(cb1);
    // },
  ], callback);

};
