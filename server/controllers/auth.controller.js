//
// Auth Requests
//

module.exports = function(injectables) {

  // get references to the libs that we injected
  const mongoose = injectables.mongoose;
  const status = injectables.status;
  const bcrypt = injectables.bcrypt;
  const auth = injectables.auth;

  const Users = mongoose.model('users');

  const dummyUser = {
    title: 'Mr',
    firstname: 'Steve',
    lastname: 'Saxton',
    greeting: 'Hi Steve',
    roles: [ 'ADMIN', 'USER' ],
    token: 'kj9dPtsgrujwN30xnn9GOrpXo8_Qdfg5YCaSzU4v',
  };

  // POST .../auth/login/ [formdata]
  function login(req, res, next) {

    // func to be had here  ....
    const data = req.body;

    console.log('\nLOGIN DATA is \n', data );

    // if there is no data or some of it is missing - UNAUTHORIZED
    if (!data || !data.email || !data.password) {
      return res.sendStatus(status.UNAUTHORIZED);
    }

    auth.lookupUser(data.email, (err,user) => {
      if(err) {
        return next(err);
      }
      if (!user) {
        return res.sendStatus(status.FORBIDDEN);  // deactivted user
      }

      // let the bcrypt library do password compare
      bcrypt.compare(data.password, user.password, (err, match) => {
        if (err) {
          return next(err);
        }
        if (!match) {
          return res.sendStatus(status.UNAUTHORIZED);  // wrong password
        }

        // renew the JWT token
        const token = auth.generateToken( user );

        // add in some properties and also
        // user.flag = 1;    // DUMMY
        // user.token = token;

        // dont send back this junk password part
        // delete user.password;
        // delete user.__v;

        // Do we NEED to return all the data or JUST the token
        res.json({ token });
        // res.json({ user, token });
     });
    });
  }

  // POST .../auth/logout/ [formdata]
  function logout(req, res) {
    console.log('\LOGOUT CALLED\n');
    // record last loggedIn date & time
    // auth.removedToken();
    return res.sendStatus(status.OK);
  }

  // POST .../auth/register/ [formdata]
  function register(req, res, next) {
    // func to be had here  ....
    const {
      email,
      password,
    } = req.body;

    console.log('\nREGISTER DATA is \n', req.body );

    // if there is no data or some of it is missing - UNAUTHORIZED
    // there are other fileds but I don't care about them right now ...
    if (!email || !password) {
      return res.sendStatus(status.NOT_ACCEPTABLE);   // REQUEST IS NOT ACCEPTABLE
    }

    // check that the user does not
    auth.lookupUser(email, (err,user) => {
      if(err) {
        return next(err);
      }
      if (user) {
        return res.sendStatus(status.FORBIDDEN);  // deactivted user
      }
        // Create the new record
        Users.post( { email, password }, (err,response) => {
          if(err) {
            return next(err);
          }

          const token = auth.generateToken( response );

          // add in some properties and also
          // user.flag = 1;    // DUMMY
          // user.token = token;

          // dont send back this junk password part
          // delete user.password;
          // delete user.__v;

          // Do we NEED to return all the data or JUST the token
          // res.sendStatus(status.CREATED).json(response, token);
          res.sendStatus(status.CREATED).json(token);
        });
    });
  }

  // POST .../auth/forgot/ [formdata]
  function forgot(req, res) {
    res.json(dummyUser);
  }

  return {
    login,
    register,
    forgot,
    logout,
    // getToken,
  };
};
