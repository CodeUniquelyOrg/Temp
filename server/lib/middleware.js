// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Middleware functions that do helpful things
// ===============================================================
module.exports = function(injectables) {

  const mongo    = injectables.mongo;
  const mongoose = injectables.mongoose;
  const status   = injectables.status;

  // access to the user data
  const Users = mongoose.model('users');

  // get a BSON ObjectID reference
  let ObjectId = mongo.ObjectID;

  function limitToDriver(req, res, next) {
    const admin = req.user && req.user.roles && req.user.roles.indexOf('driver') !== -1;
    if (admin) {
      return next();
    }
    return res.sendStatus(status.UNAUTHORIZED);
  }

  function limitToManager(req, res, next) {
    const admin = req.user && req.user.roles && req.user.roles.indexOf('manager') !== -1;
    if (admin) {
      return next();
    }
    return res.sendStatus(status.UNAUTHORIZED);
  }

  function limitToAdmin(req, res, next) {
    const admin = req.user && req.user.roles && req.user.roles.indexOf('admin') !== -1;
    var user = req.user;
    if (admin) {
      next();
    } else {
      return res.sendStatus(status.UNAUTHORIZED);
    }
  }

  function limitToAuthenticated(req, res, next) {
    var user = req.user;
    if (user) {
      next();
    } else {
      return res.sendStatus(status.UNAUTHORIZED);
    }
  }

  // =======================================================
  // Check the UPDATE is acting on the same record, it read
  // =======================================================
  function rejectIfRecordIdHasAlteredId(prop) {
    return function(req, res, next) {
      // id to compare from value of param[prop] indicated
      var param = req.params[prop];
      var id = support.intFromParam(param);

      var entry = req.body;
      if (typeof entry._id === 'undefined') {
        return res.status(status.BAD_REQUEST).json({ error: 'no data provided in update' });
      }
      if (entry._id !== id) {
        return res.status(status.BAD_REQUEST).json({ error: 'entry does not match id provided' });
      }
      next();
    };
  }

  // Only allowed to get history of your own registration data
  function limitToOwnRegistrations(req, res, next, registration) {

    var user = req.user;
    if (!user) {
      return res.sendStatus(status.UNAUTHORIZED);
    }

    // check the request for a registratio
    // const registration = req.params.reg || '';
    const query = {
      $and: [
        { '_id': ObjectId(user._id) },
        { 'registrations.normalizedPlate': registration },
      ],
    };

    // count records matching the query
    const data = Users.count( query, (err,count) => {
      if (count=== 0) {
        return res.sendStatus(status.UNAUTHORIZED);
      }

      // only alowed to request from 'user.createdDate'
      // only alowed to requst from 'date' user took on that plate

      // No issues - so allowed to progress
      next();
    });

  }

  // YOU MAY ONLY REQUEST YOUR OWN

  // // Only list records where you are from that schools
  // // ===================================================
  // function limitToOwnShoool(req, res, next) {
  //   var user = req.user;
  //
  //   // Auth middleware should render this check redundant
  //   // if(!user) {
  //   //   return support.setUnauthorized(res); // { error: 'Not authorized' };
  //   // }
  //   var userId = req.user._id;
  //
  //   if (user.internal) {
  //     next();
  //   } else {
  //     getOrganisationList(userId, (err, organisations) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       // Merge this query into the existing query ???
  //       req.where = { $or: [
  //         { organisation: { $in: organisations } }, { partner: { $in: organisations } },
  //       ] };
  //       next();
  //     });
  //   }
  // }

  // Limited to runners where you are the parent
  //   Not run by ADMIN (run by a School)
  // ===================================================
  // function limitToOwnRunners(req, res, next) {
  //   var user = req.user;
  //   if (user.internal) {
  //     next();
  //   } else {
  //     var userId = req.user._id;
  //     // --- get all schools where I have access --
  //     getSchoolsList(userId, (err, schools) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       // get all the runners from all those schools
  //       getRunnersList(schools, (err, runners) => {
  //         if (err) {
  //           return next(err);
  //         }
  //         // list only the visible states
  //         var allowedStates = ['published', 'acknowledged', 'actioning', 'accepted', 'archived'];
  //         getStates(allowedStates, (err, states) => {
  //           // Merge this query into the existing query ???
  //           req.where = { runner: { $in: runners }, $and: [
  //             { workflow: { $in: states } },
  //           ] };
  //           next();
  //         });
  //       });
  //     });
  //   }
  // }

  // return all the middleware functions
  return {
    rejectAlteredId: rejectIfRecordIdHasAlteredId,
    limitToAdmin: limitToAdmin,
    limitToManager: limitToManager,
    limitToDriver: limitToDriver,
    limitToAuthenticated: limitToAuthenticated,
    limitToOwnRegistrations: limitToOwnRegistrations,
  };
};
