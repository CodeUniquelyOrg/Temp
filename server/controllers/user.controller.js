module.exports = function(injectables) {

  // get references to the libs we injected
  const mongoose = injectables.mongoose;
  const status   = injectables.status;

  // reference the 'users' Collection
  const Users = mongoose.model('users');

  function get(req, res, next) {
    Users.find({}, (err,users) => {
      if (err) {
        next(err);
      }
      res.json(users);
    });
  }

  function getById(req, res, next) {

    console.log( 'USER IS ', req.user ); // eslint-disable-line no-console

    // clone the data from the request user ...
    const user = Object.assign({}, req.user);

    // clean up some of he stuff
    delete user._id;
    delete user.__v;
    delete user.password;

    res.json(user);

    // NEED A CHECK in MIDDLEWARE .....
    // const id = req.user._id;

    // Users.findOne({ _id:id }, (err,user) => {
    //   if (err) {
    //     next(err);
    //   }
    //  res.json(user);
    // });
  }

  // var id = support.id(req.params.id);
  // Settings.put(id, req.body, support.processPutResults(res, next));

  function update(req, res, next) {

    // console.log( 'USER IS ', req.user ); // eslint-disable-line no-console

    // clone the data from the request user ...
    const user = Object.assign({}, req.user);

    // copy the passed in data into a local object
    const data = Object.assign({}, req.body.user);

    // clean up some of he stuff
    delete user._id;

    // if ( user._id === data._id ) {
    //  Allowed to do this ....
    // }

    // get the email address

    res.json(user);

    // NEED A CHECK in MIDDLEWARE .....
    // const id = req.user._id;

    // Users.findOne({ _id:id }, (err,user) => {
    //   if (err) {
    //     next(err);
    //   }
    //  res.json(user);
    // });
  }

  return {
    get,
    getById,
    update,
  };
};