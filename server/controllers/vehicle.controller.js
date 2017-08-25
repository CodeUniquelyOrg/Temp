//
// Vehicle Controller
//
module.exports = function(injectables) {

  // internal server libraries - should INJECT the whole library
  const workflow = require('../lib/workflow')(injectables);
  const status = injectables.status;
  const config = injectables.config;

  // load up the request library
  const requestLib = require('../lib/async')(injectables);
  const userLib = require('../lib/user')(injectables);

  // get information about the qrCode we been passed
  function checkUserGivenCode(req, res, next) {

    // take the code from the posted form data
    const code = req.body.code;

    const jwt  = req.jwt;    // if teh user has  JWTthen its already in this property
    const user = req.user;   // and I already have WHATEVER user record we are holding

    // use this "Backend API" endpoint
    let api = `vehicle/${code}`;

    // basically not implemented yet !!!
    requestLib.get(api, { code }, (err,data) => {
      if (err) {
        return next(err);
      }

      // ===================================
      // Nothing was returned or the webApi
      // could not find the code passed in!
      // ===================================
      if(!data || !data.vehicleIdentifier) {
        // ???
        // send them back to login / register page
        return res.sendStatus(status.BAD_REQUEST);  // BAD REQUEST ||
      }

      // decode the response from webApi
      const {
        vehicleIdentifier,
        registered,
        plate,
      } = data;

      // force creation of a JWT - maybe a user record
      // if ( !jwt ) {
      //   return res.sendStatus(status.PRECONDITION_REQUIRED).json(data);
      // }

      // NO JWT on drivers CURRENT device
      // THEY HAVE NOT LOGED IN OR VISITED HE SITE BEFORE
      // I CANT KNOW WHO HEY ARE
      if (!jwt) {
        // create a user record or the driver
        // CANNOT SET
        //    email or password
        // CAN SET
        //    other.registered: false
      }

      // is the driver making this request a registered driver
      // has the driver apparently driven this vehicle before?
      const driverRegistered = userLib.isUserRegistered(user);
      const hasDrivenBefore = userLib.isVehicleInUsersList(user, vehicleIdentifier);

      // ==========================================
      //  A already 'marked as registered' vehicle
      // ==========================================
      if (registered) {

        // Driver is registered on "driver portal"
        if (driverRegistered) {

          // driver HAS driven this vehicle before, we know
          // because its in the "list of known registrations"
          if (hasDrivenBefore) {

            // OK - ALLOW them to connect to the existing data
            return res.json(data);
            // return res.sendStatus(status.OK);

          } else {

            // warn them that they CAN proceed with this
            // and that it will create a new ownership
            // if they have another device they should
            // go to that device from that device
            return res.sendStatus(status.LOCKED);

          }

        } else {

          // NOT registered on "Driver Portal" !!!

          // inform that they CANNOT take over the vehicle from the current driver
          // and that they must be registered first, in order to attempt this ...
          return res.sendStatus(status.FORBIDDEN);
        }
      }

      // ==========================================
      // A vehicle not marked as already registered
      // ==========================================
      if (!registered) {

        if (driverRegistered) {

          // => create the registration in webApi
          // webApi => will need the driver's userId

          if (hasDrivenBefore) {
            //
          } else {
            //
          }

        } else {
          //

          if (hasDrivenBefore) {

            // ignore QR CODE
            // send LAST RESULT ONLY - last set of data
            // GET LAST DATA RECORD  (KISOK VIEW)...

          } else {

            // send LAST RESULT ONLY - last set of data

            // ????
            // => create a driver record in user

            // GET LAST DATA RECORD  (KISOK VIEW)...
          }
        }
      }

      // check if

      // we have a number of possibilities

      // response says:

      // No record of this code => no drive-over matched
      // {}

      // drive over found - vehicle is not marked as registered
      // {
      //   "vehicleIdentifier": 123,
      //   "registered": false,
      //   "timestamp": ""
      //   "plate": "HDLS704"
      // }

      // drive over found - vehicle is not marked as registered
      // {
      //   "vehicleIdentifier": 123,
      //   "registered": true,
      //   "timestamp": ""
      //   "plate": "HDLS704"
      // }

      // workflow.createUserRecord( x, y, x, (err,data){
      //   if (err) {
      //     next(err);
      //   }
      //
      //   ... do somthing about the data here  ...
      //
      // });

      res.json(data);
    });
  }

  return {
    checkUserGivenCode,
  };

};