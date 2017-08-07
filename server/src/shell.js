// ==============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Copyright (c) 2017 Code Uniquely Ltd.
// Express V4 Shell, Loaded by HMR-Server or compiled by Webpack
// ==============================================================
module.exports = function shell(express, callback) {

  let path         = require('path');
  let bodyParser   = require('body-parser');
  let cors         = require('cors');
  let compression  = require('compression');
  let queries      = require('express-api-queryhandler');
  let jwt          = require('jwt-simple');
  let mongoose     = require('mongoose');
  let async        = require('async');
  // let sanitizeHtml = require('sanitize-html');
  // let promise      = require('bluebird');
  // let directMail   = require('directmail');

  // DB Library Functions
  let database = require('./lib/db');
  let support  = require('./lib/support');

  // Server configurtion
  const config = require('./config');

  // Ports being used
  // const port = config.sever.port; //  process.env.APP_PORT || 8000;

  // What relative path is the UI content to be served from
  const publicPath = path.resolve(__dirname, config.server.public || 'public');

  // milli-seconds in one hour
  const oneHour = 3600000;

  // Express Sevrver - 'public / static content' configuration
  const publicConfig = {
    dotfile: 'ignore',
    etag: true,
    index: false,
    maxAge: oneHour,
    lastModified: true,
  };

  // Inject all the 'Mongoose' models
  require('./models')(mongoose);

  // ========================================
  // Main Website Express V 4.x for UI pages
  // ========================================
  let app = module.exports = express();

  // enable gzip compression on the server
  app.use(compression());

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

  // Extensions for filtering and sorting in mongoose queries
  app.use(queries.filter());
  app.use(queries.pagination({ limit: 1000 }));
  app.use(queries.sort());

  // serve static file contents
  app.use(express.static(publicPath, publicConfig));
  // serve mocks
  // app.use('/src/mock', express.static(path.resolve(__dirname, 'src', 'mock')));

  // CORS on all requests (DB may be on another server)
  app.use(cors());

  // configure allowed headers in client requests
  const headers = require('./lib/headers')(config);
  app.use(headers);

  // ================================
  //        INJECT THE ROUTES
  // ================================
  const options = {
    app:app,
    express: express,
    support: support,
    middleware: require('./lib/middleware')(support),
    // auth: require('./lib/auth')(jwt, support, config),
    config: config,
  };

  // Inject the API routing / handler modules
  require('./routes')(app, options);

  // deal with requested paths under the public path
  app.use((req, res, next) => {
    if (req.url !== '/index.html') {
      req.url = '/index.html'; // eslint-disable-line no-param-reassign
    }
    next('route');
  });

  // Set native promises as mongoose promise
  const db = database(mongoose, global.promise);

  // provide an error hndler
  db.errorHandler(err => {
    if (err) {
      console.error(err);  // eslint-disable-line no-console
    }
  });

  // configure the DB
  db.configure(config);  // db.configure(config, { reload: true });

  // db.preLoad();  --

  /* eslint-disable no-console */
  db.connect((err, url, options) => {

    if (err) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      return callback(err);
    }

    console.log('\n');
    console.log('-----------------------------------------------------------------------');
    console.log(' Connecting to Database with the following configuration options: ');
    console.log('-----------------------------------------------------------------------');
    if (url) {
      console.log(url);
    }

    console.log('OPTIONS Where ', options); // eslint-disable-line no-console

    // !!! LOAD MOCK DATA if REQYURED !!!
    // dummyData();
    require('../mock/dummyData')(async,mongoose, (err) => {

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
          console.log('UI running on port ' + port + ', waiting for bundling to finish...'); // eslint-disable-line
          console.log('API listening at http://%s:%s\n', host, port);
          callback(null, port);
        }
      });
    });
  });
};
