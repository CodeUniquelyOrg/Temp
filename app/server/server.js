import path from 'path';
import fs from 'fs';
import express from 'express';
// import queries from 'express-api-queryhandler';
import bodyParser from 'body-parser';
import cors from 'cors';
import status from 'http-status';
import agent from 'superagent';
import compression from 'compression';
import jwt from 'jwt-simple';
import mongo from 'mongodb';
import mongoose from 'mongoose';
import async from 'async';
import bcrypt from 'bcrypt-nodejs';
import locale from 'locale';

// get the configuration from the config file
import config from './config';

// SSR - full page render function
import router from './router';

// PORT being used
// const PORT = config.server.port; //  process.env.APP_PORT || 8000;

// ========================================
// Main Website Express V 4.x for UI pages
// ========================================
const app = express();

// build initial dependancy injectables object - reference libraries
const injectables = {
  agent: agent,
  app:app,
  async: async,
  bcrypt: bcrypt,
  compression: compression,
  config: config,
  express: express,
  fs: fs,
  jwt: jwt,
  locale: locale,
  mongo: mongo,
  mongoose: mongoose,
  path: path,
  status: status,
};

// Inject the schema models - DONE as the VERY FIRST thing
// some of the schema are used in the middleware libraries
// that follow, so we need to declare the schema early on.
import models from './models';
models(injectables);

// load the dtabase
const database = require('./services/db.js');
// console.log('DATABASE ', database); // eslint-disable-line no-console

// Set native promises as mongoose promise - inside the library
const db = database(injectables); // mongoose, global.promise);

// configure the DB with injectables ?????? NO required
db.configure(); // config);  // db.configure(config, { reload: true });

// ========================================================
//  Augment the injectables with the MIDDLEWARE libraries
//  MUST be done after all the schema have been loaded!!!
//  As the schema are used in these libraries
// ========================================================
const authentiction = require('services/auth')(injectables);
injectables.auth = authentiction;

// No longer needs - access to the Scheam to be available ...
const middleware = require('services/middleware.js')(injectables);
injectables.middleware = middleware;

/* eslint-disable no-console */
db.connect((err, url, options) => {
  if (err) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw err;
  } else {
    // Load Mock data
    require('./mock/dummyData')(injectables, (err) => {
      if (err) {
        console.error('Error loading dummy data!'); // eslint-disable-line no-console
        return callback(err);
      }
    });
  }
});

// if (process.env.NODE_ENV === 'development') {
//   import webpackDevMiddleware from 'webpack-dev-middleware';
//   import webpackHotMiddleware from 'webpack-hot-middleware';
//   const compiler = webpack(config);
//   app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
//   app.use(webpackHotMiddleware(compiler));
// }

// Enable CORS - calls will be made to other servers
app.use(cors());

// Body Parsing - 'FORM DATA'
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

// Mongo - Query - [ filter / Pagination / Sorting ] Extensions
// app.use(queries.filter());
// app.use(queries.pagination({ limit: 1000 }));
// app.use(queries.sort());

// Public Path
// const publicPath = express.static(path.join(__dirname, '../assets'));

// Be Explicit about 'allowed headers' in client requests
const headers = require('./lib/headers')(config);
app.use(headers);

// Local Supoor attached - configured
app.use(locale(config.locales.supported, config.locales.default));

// ALWAYS set the 'locale' header in the Response
app.use(function(req, res, next) {
  const locale = req.locale.trim();
  res.header('Content-Language', locale);
  next();
});

// ========================================================
//  Set up handling for all routes in the API
// ========================================================

// ASSIGN API ROUTES + CONTROLLERS
// app.use('/api', posts);
require('./routes')(injectables); // => controllers

// Server Side Rendering based on routes matched by React-router.
app.use(router);

const PORT = config.server.port;
console.log('-----------------------------------------------------------------------');
console.log('\nstarting server on port ' + PORT + '.');

let server = app.listen(PORT, '0.0.0.0', (err) => {
  if( err ) {
    console.log('Error Occurred', err);
    callback(err);
  } else  {

    try {

      let hostFull = server.address();
      let host = hostFull.address;
      // let host = server.address().address;
      if ( host === '::' ) {
        host = 'localhost';
      }
      const port = server.address().port;
      console.log('API listening at http://%s:%s\n', host, port); // eslint-disable-line no-console

    } catch( e ) {
      console.log(e);
    }
  }
});

/* eslint-enable no-console */
