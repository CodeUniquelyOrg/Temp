let path         = require('path');
let express      = require('express');
let queries      = require('express-api-queryhandler');
let bodyParser   = require('body-parser');
let cors         = require('cors');
let status       = require('http-status');
let request      = require('superagent');
// let soap         = require('soap');
let compression  = require('compression');
let jwt          = require('jwt-simple');
let mongoose     = require('mongoose');
let async        = require('async');
let bcrypt       = require('bcrypt-nodejs');

// load the dtabase
let database     = require('./lib/db.js');

// get the configuration
let config       = require('./config');

// PORT being used
// const PORT = config.server.port; //  process.env.APP_PORT || 8000;

// ========================================
// Main Website Express V 4.x for UI pages
// ========================================
const app = express();

// Enable CORS - calls will be made to other servers
app.use(cors());

// Body Parsing - 'FORM DATA'
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Mongo - Query - [ filter / Pagination / Sorting ] Extensions
app.use(queries.filter());
app.use(queries.pagination({ limit: 1000 }));
app.use(queries.sort());

// Be Explicit about 'allowed headers' in client requests
const headers = require('./lib/headers')(config);
app.use(headers);

// build initial dependancy injectables object - reference libraries
const injectables = {
  app:app,
  async: async,
  bcrypt: bcrypt,
  compression: compression,
  config: config,
  express: express,
  jwt: jwt,
  mongoose: mongoose,
  request: request,
  status: status,
};

// Inject the schema models - DONE as the VERY FIRST thing
require('./models')(injectables);

// ========================================================
//  Augment the injectables with the Authentication library
//  MUST be done after all the schema have been loaded !!!
// ========================================================
const authentiction = require('./lib/auth')(injectables);
injectables.auth = authentiction;

// set up handling for these routes
require('./routes')(injectables);

// console.log('DATABASE ', database); // eslint-disable-line no-console

// Set native promises as mongoose promise
const db = database(injectables); // mongoose, global.promise);

// provide error handler for the DB
db.errorHandler(err => {
  if (err) {
    console.error(err);  // eslint-disable-line no-console
  }
});

// Must be a '404'
// app.use((req, res, next) => {
//   return res.status(status.NOT_FOUND).send({ error: 'Not found' });
// });

// configure the DB with injectables
db.configure(); // config);  // db.configure(config, { reload: true });

/* eslint-disable no-console */
db.connect((err, url, options) => {

  if (err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw err;
  } else {

    console.log('\n');
    console.log('-----------------------------------------------------------------------');
    console.log(' Connecting to Database with the following configuration options: ');
    console.log('-----------------------------------------------------------------------');
    if (url) {
      console.log(url);
    }
    // if (options) {
    //   console.log(options);
    // }

    // Load Mock data
    require('./mock/dummyData')(injectables, (err) => {

      if (err) {
        console.error('Error loading dummy data!'); // eslint-disable-line no-console
        return callback(err);
      }

      const PORT = config.server.port;

      console.log('-----------------------------------------------------------------------');
      console.log('\nstarting server on port ' + PORT + '.');

      let server = app.listen(PORT, '0.0.0.0', (err) => {
        if( err ) {
          callback(err);
        } else  {
          let host = server.address().address;
          if ( host === '::' ) {
            host = 'localhost';
          }
          const port = server.address().port;
          // console.log('UI running on port ' + port + ', waiting for bundling to finish...'); // eslint-disable-line
          console.log('API listening at http://%s:%s\n', host, port); // eslint-disable-line no-console
          // callback(null, port);
        }
      });
    });
  }
});
/* eslint-enable no-console */
