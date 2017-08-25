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

  // get information about the qrCode we been passed
  function checkUserGivenCode(req, res, next) {

    // take the code from the posted form data
    const code = req.body.code;

    // BAckend API request endpoint
    let api = `vehicle/${code}`;
    if (config.webapi.offline) {
      if (code==='reg') {
        api = 'vehicle/registered';
      } else {
        api = 'vehicle/not/registered';
      }
    }

    // basically not implemented yet !!!
    requestLib.get(api, { code }, (err,data) => {
      if (err) {
        return next(err);
      }

      // we have a number of possibilities

      // response says:

      // No record of this code => no drive-over matched
      // {}

      // drive over found - vehicle is not marked as registered
      // {
      //   "vehicleIdentifier": 123,
      //   "registered": false,
      //   "plate": "HDLS704"
      // }

      // drive over found - vehicle is not marked as registered
      // {
      //   "vehicleIdentifier": 123,
      //   "registered": true,
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