// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Return RESPONSE Headers
// ===============================================================
module.exports = function support(jwt, support, config) {

  var Users = support.users();

  function getDbUser(authUser, callback) {
    // get the users identity
    const identity = authUser.identity;

    Users.getOne({ identity: identity }, (err, user) => {
      if (err) {
        callback(err);
      } else {
        if (!user.active) {
          callback();  // Inactive User => FORBIDDEN
        } else {
          if (user.toObject) {
            user = user.toObject();
          }
          callback(null, user);
        }
      }
    });
  }

  // function getAuth(req) {
  //   var token = req.headers['x-auth'] || null;
  //   return jwt.decode(token, config.auth.secret);
  // }

  function generateToken(iis, user, exp) {
    return jwt.encode({ iss: iis, user: user, exp: exp }, config.auth.secret);
  }

  // =============================================
  // Middleware(s)
  // =============================================
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
            token = bearer.replace('Bearer ', '');
          } else {
            token = bearer;
          }
        }
      }
    }

    // var token = req.headers['x-auth'] || null;
    if (!token) {
      return support.unauthorized(res);
    }

    try {
      // decode a token
      var auth = jwt.decode(token, config.auth.secret);

      // was the token encoded for this application
      if (auth.iss !== config.auth.iis) {
        return support.unauthorized(res);
      }

      // is the token still valid at this time
      if (auth.exp * 1000 < Date.now()) {
        return support.unauthorized(res);
      }

      // Users.getById(userId, function(err, result) {
      getDbUser(auth.user, (err, user) => {
        if (err) {
          return next(err);
        }

        // Inactive
        if (!user) {
          return support.forbidden(res);
        }

        req.user = user;
        return next();
      });
    } catch (err) {
      return support.unauthorized(res);
    }
  }
  /* eslint-enable complexity */

  function registeredOnly(req, res, next) {
    if (req.user && req.user._id && req.user._id !== -1) {
      return next();
    }
    support.unauthorized(res);
  }

  function schoolOnly(req, res, next) {
    next();
    // const admin = req.user && req.user.admin;
    // if (admin) {
    //   return next();
    // }
    // return support.setUnauthorized(res);
  }

  function adminOnly(req, res, next) {
    const admin = req.user && req.user.admin;
    if (admin) {
      return next();
    }
    support.unauthorized(res);
  }

  return {
    authorize: authorize,
    generateToken: generateToken,
    registeredOnly: registeredOnly,
    schoolOnly: schoolOnly,
    adminOnly: adminOnly,
  };
};
