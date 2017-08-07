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

  function getDbUser(email, callback) {
    Users.findOne({ email }, (err, user) => {
      if (err) {
        callback(err);
      } else {
        if (!user || user.disabled) {
          callback();  // disabled User => FORBIDDEN
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

    console.log('EXPIRES IS ', exp);
    let expTime = new Date().getTime() + exp;

    const obj = {
      userId: user._id,
      email: user.email,
      // created: user.created,
      // disabled: user.disabled,
    };

    // return jwt.encode({ iss: config.version, user, exp:expTime }, config.auth.secret);
    return jwt.encode({ iss: config.version, user:obj, exp:expTime }, config.auth.secret);
  }

  // =============================================
  // Middleware(s)
  // =============================================

  //
  // token = {
  //   user: {
  //      ... DB data for the user ...
  //   },
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

      // EXTRACT email from token and find the matching user
      // Users.getById(userId, function(err, result) {
      getDbUser(auth.user.email, (err, user) => {
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

        console.log(`\nAUTHENTICATED => ${user.email}\n`);

        // Inject the user proprties into the request....
        req.user = user;
        return next();
      });
    } catch (err) {

      console.log('AUTH ERROR ', err );

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

  // function adminOnly(req, res, next) {
  //   const admin = req.user && req.user.admin;
  //   if (admin) {
  //     return next();
  //   }
  //   support.unauthorized(res);
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
