// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Return RESPONSE Headers
// ===============================================================
module.exports = function support(injectables){

  const jwt = injectables.jwt;
  const config = injectables.config;
  const mongoose = injectables.mongoose;
  const status   = injectables.status;

  // Attach to the users DB Collection
  const Users = mongoose.model('users');

  function getDbUserById(userId, callback) {
    Users.findOne({ _id: userId }, (err, user) => {
      if (err) {
        callback(err);
      } else {
        if (!user || user.disabled) {
          callback();
        } else {
          if (user.toObject) {
            user = user.toObject();
          }
          callback(null, user);
        }
      }
    });
  }

  function getDbUser(email, callback) {
    Users.findOne({ email }, (err, user) => {
      if (err) {
        callback(err);
      } else {
        if (!user || user.disabled) {
          callback();
        } else {
          if (user.toObject) {
            user = user.toObject();
          }
          callback(null, user);
        }
      }
    });
  }

  function getAuth(req) {
    var token = req.headers['x-auth'] || null;
    return jwt.decode(token, config.auth.secret);
  }

  function generateToken(user, exp = config.auth.expire) {

    let expTime = new Date().getTime() + exp;

    const obj = {
      userId: user._id,
      email: user.email,
    };

    return jwt.encode({ iss: config.version, user:obj, exp:expTime }, config.auth.secret);
  }

  // =============================================
  // Middleware(s)
  // =============================================

  //
  // token = {
  //   user: { email, _id },
  //   iis: config.version,
  //   exp: '... ticks ...',
  // };
  //
  /* eslint-disable complexity */
  function authorize(req, res, next) {
    if (req.method === 'OPTIONS') {
      return next();
    }

    // variable placeholders for userId & token
    let token;

    // 'x-api-auth' - used by phone
    var apiToken = req.headers['x-api-auth'] || null;
    if (apiToken) {
      token = apiToken;
    } else {
      // 'x-auth' - used by browser
      var appToken = req.headers['x-auth'] || null;
      if (appToken) {
        token = appToken;
      } else {
        // Other apps, may pass in an 'authorization' token
        var authToken = req.headers.authorization || null;
        if (authToken) {
          // Look for 'Bearer ', followed by the token
          if (authToken.indexOf('Bearer ') !== -1) {
            token = authToken.replace('Bearer ', '');
          } else {
            token = authToken;
          }
        }
      }
    }

    // var token = req.headers['x-auth'] || null;
    if (!token) {
      return res.sendStatus(status.UNAUTHORIZED);
    }

    try {
      // decode a token
      var auth = jwt.decode(token, config.auth.secret);

      // was the token encoded for this application
      if (auth.iss !== config.version) {
        return res.sendStatus(status.UNAUTHORIZED);
      }

      // is the token still valid at this time
      if (auth.exp * 1000 < Date.now()) {
        return res.sendStatus(status.UNAUTHORIZED);
      }

      // EXTRACT userId from token and find that user ONLY
      getDbUserById(auth.user.userId, (err, user) => {
        if (err) {
          return next(err);
        }

        // deactivated
        if (!user) {
          return res.sendStatus(status.FORBIDDEN);
        }

        // Does userId (encoded) in token match the iternal _id;
        // no => then user is not who they are preteding to be
        if (auth.user.userId !== user._id.toString()) {
          return res.sendStatus(status.FORBIDDEN);
        }

        console.log(`\nAUTHENTICATED => ${user.email}\n`); // eslint-disable-line

        // Inject the user proprties into the request....
        req.user = user;
        return next();
      });
    } catch (err) {

      console.log('AUTH ERROR ', err ); // eslint-disable-line

      return res.sendStatus(status.UNAUTHORIZED);
    }
  }
  /* eslint-enable complexity */

  function registeredOnly(req, res, next) {
    if (req.user && req.user._id) {
      return next();
    }
    return res.sendStatus(status.UNAUTHORIZED);
  }

  // function driverOnly(req, res, next) {
  //   const admin = req.user && req.user.roles && req.user.roles.indexOf('driver') !== -1;
  //   if (admin) {
  //     return next();
  //   }
  //   return res.sendStatus(status.UNAUTHORIZED);
  // }

  // function managerOnly(req, res, next) {
  //   const admin = req.user && req.user.roles && req.user.roles.indexOf('manager') !== -1;
  //   if (admin) {
  //     return next();
  //   }
  //   return res.sendStatus(status.UNAUTHORIZED);
  // }

  // function adminOnly(req, res, next) {
  //   const admin = req.user && req.user.roles && req.user.roles.indexOf('admin') !== -1;
  //   if (admin) {
  //     return next();
  //   }
  //   return res.sendStatus(status.UNAUTHORIZED);
  // }

  return {
    authorize: authorize,
    generateToken: generateToken,
    registeredOnly: registeredOnly,
    lookupUser: getDbUser,
    // comparePassword: comparePassword,
    // adminOnly: adminOnly,
  };
};
