// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Middleware functions that do helpful things
// ===============================================================
module.exports = function(injectables) {

  // var Schools = support.schools();
  // var Runners = support.runners();
  // var Sessions = support.sessions();
  // var Users = support.users();

  // reference to support injection
  const support = injectables.support;


  // Get School List
  // ==================================================================
  // function getSchoolList(userId, next) {
  //   Schools.find({ users: { $in: [userId] } }, { _id: 1 }, (err, result) => {
  //     if (err) {
  //       next(err);
  //     }
  //     var entities = [];
  //     if (result.length !== 0) {
  //       entities = result.map(item => {
  //         return item._id;
  //       });
  //     }
  //     next(null, entities);
  //   });
  // }

  // Get Runners from Multiple Schools (say, previous got by POSTCODE)
  // ==================================================================
  // function getRunnersList(schools, next) {
  //   var query = { $or: [
  //       { school: { $in: schools } }, { partner: { $in: school } },
  //   ] };
  //   Runners.find(query, { _id: 1 }, (err, result) => {
  //     if (err) {
  //       next(err);
  //     }
  //     var records = [];
  //     if (result.length !== 0) {
  //       records = result.map(item => {
  //         return item._id;
  //       });
  //     }
  //     next(null, records);
  //   });
  // }

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

  // function checkIfReviewer(req, res, next) {
  //   if (req.method === 'OPTIONS') {
  //     return next();
  //   }
  //   var user = req.user;
  //   if (!user.internal) {
  //     req.user.reviewer = false;
  //     next();
  //   } else {
  //     if (req.params.cid) {
  //       var cid = parseInt(req.params.cid, 10);
  //       var uid = req.user._id;
  //       Reviewers.getOne({ user: uid, customer: cid }, (err, result) => {
  //         if (err) {
  //           // console.log(err);
  //           return next(err);
  //         } else {
  //           req.user.reviewer = !!(result !== null);
  //           return next();
  //         }
  //       });
  //     } else {
  //       req.user.reviewer = false;
  //       return next();
  //     }
  //   }
  // }

  // // Adjust the query selection to exclude internal events
  // // ===================================================
  // function limitExternalEventVisibility(req, res, next) {
  //   var user = req.user;
  //   if (user.internal) {
  //     next();
  //   } else {
  //     // Merge this addiotnal term into the existing query as $and
  //     req.where = { internal: false };
  //     next();
  //   }
  // }

  function limitToAdmin(req, res, next) {
    var user = req.user;
    if (user.admin) {
      next();
    } else {
      return support.setUnauthorized(res); // { error: 'Not authorized' };
    }
  }

  function limitToAuthenticated(req, res, next) {
    var user = req.user;
    if (user) {
      next();
    } else {
      return support.setUnauthorized(res); // { error: 'Not authorized' };
    }
  }

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

    // allowedToAccessRunner: allowedToAccessRunner,
    // allowedToAccessSchool: allowedToAccessSchool,
    // allowedToAccessSession: allowedToAccessSession,
    // allowedToAccessUser: allowedToAccessUser,
    // limitEventVisibility: limitExternalEventVisibility,

    limitToAdmin: limitToAdmin,
    // limitToSchoolOnly: limitToSchoolOnly,
    // limitToParentOnly: limitToParentOnly,
    limitToAuthenticated: limitToAuthenticated,
  };
};
