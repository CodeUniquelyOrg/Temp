/*
  const bcrypt = require('bcrypt');

  function cryptPassword(password, callback) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        return callback(err);
      }
      bcrypt.hash(password, salt, function(err, hash) {
        return callback(err, hash);
      });
    });
  }

  function comparePassword(password, userPassword, callback) {
    bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err) {
        return callback(err);
      }
      return callback(null, isPasswordMatch);
    });
  }

  function lookupUser(identity, password, callback) {
    // const encrypted = encode(pasword);
    const encrypted = cryptPassword(password);

    Users.getOne({ userid:identity }, (err, user) => {

      if (err) {
        return callback(err);
      }

      if (!user.active) {
        return callback();  // Inactive User => FORBIDDEN
        // return callback(null, { status:'INACTIVE' });
      }

      // if (user.locked) {
      //   return callback(null, { status:'LOCKED' }); // ACCOUNT LOCKED
      // }

      // if (user.passwordReset) {
      //   return callback(null, { status:'RESET' });  // RESET PASSWORD
      // }

      comparePassword(encrypted, user.password, function(err, isPasswordMatch){
        if (err) {
          return callback(err);
        }
        if (!isPasswordMatch) {
          return callback();  // Inactive User => FORBIDDEN
        }
        if (user.toObject) {
          user = user.toObject();
        }
        callback(null, user);
      });

    });
  }

*/