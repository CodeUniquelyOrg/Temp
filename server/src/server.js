import path from 'path';
import express from 'express';
import compression from 'compression';
// import webpack from 'webpack';

// do some dragging of stuff over'
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import config from './config';

// process.env.NODE_ENV = 'development';
// process.env.BABEL_ENV = 'development';

// Reference the config file that was used
// const config = require('../webpack.config.dev');

// Ports being used
const port = config.sever.port; //  process.env.APP_PORT || 8000;

// What relative path is the UI content to be built into
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

// ===============================================================================
// 'webpack-dev-middleware' configuration
// ===============================================================================
// const compilerConfig = {
//   publicPath: config.output.publicPath,
//   noInfo: true,
//   // quiet: true,
//   stats: {
//     colors: true,
//   },
// };

// ===============================================================================
// 'webpack-hot-middleware' configuration
// ===============================================================================
// log: A function used to log lines, pass false to disable. Defaults to console.log
// path: The path the middleware serves event stream on, must match the client setting
// heartbeat: Frequency of heartbeat updates => client to keep the connection alive
// ===============================================================================
// const hotConfig = {
//   // log: false // console.log
// };

// const compiler = webpack(config);

// DB STUFF - *** ITS THE WRONG PLACE FOR IT ***
// import routes from '../client/routes';
import runners from './routes/runner.routes';
import schools from './routes/school.routes';
import sessions from './routes/session.routes';

// connected
// mongoose.Promise = global.Promise;

import dummyData from '../mocks/dummyData';

import database from './lib/db.js';
// console.log('DATABASE ', database); // eslint-disable-line no-console

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
    throw err;
  } else {
    console.log('\n');
    console.log('-----------------------------------------------------------------------');
    console.log(' Connecting to Database with the following configuration options: ');
    console.log('-----------------------------------------------------------------------');
    if (url) {
      console.log(url);
    }

    console.log('OPTIONS Where ', options); // eslint-disable-line no-console
    dummyData();
    // console.log('-----------------------------------------------------------------------');
    // console.log('\nstarting server on port ' + PORT + '.');

    // let server = app.listen(PORT, '0.0.0.0', (err) => {
    //   if( err ) {
    //     callback(err);
    //   } else  {
    //     let host = server.address().address;
    //     if ( host === '::' ) {
    //       host = 'localhost';
    //     }
    //     let port = server.address().port;
    //     console.log('UI running on port ' + port + ', waiting for bundling to finish...'); // eslint-disable-line
    //     console.log('API listening at http://%s:%s\n', host, port);
    //     callback(null, port);
    //   }
    // });
  }
});
/* eslint-enable no-console */

// // MongoDB Connection
// mongoose.connect(serverConfig.mongoURL, (error) => {
//   if (error) {
//     console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
//     throw error;
//   }
//   console.log('Conected to Mongo...'); // eslint-disable-line no-console
//   // feed dummy data into DB.
//   dummyData();
// });

// ========================================
// Main Website Express V 4.x for UI pages
// ========================================
const app = express();

// enable gzip compression on the server
app.use(compression());

// Load the various webpack middlewares
// const devMiddleware = require('webpack-dev-middleware')(compiler, compilerConfig);
// app.use(devMiddleware);

// Load the various webpack middlewares
// const hotMiddleware = require('webpack-hot-middleware')(compiler, hotConfig);
// app.use(hotMiddleware);

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));


// serve static file contents
app.use(express.static(publicPath, publicConfig));
// app.use(Express.static(path.resolve(__dirname, '../dist/client')));
// serve mocks
// app.use('/src/mock', express.static(path.resolve(__dirname, 'src', 'mock')));

// Server the API from here
app.use('/api', runners);
app.use('/api', schools);
app.use('/api', sessions);

// deal with requested paths under the public path
app.use((req, res, next) => {
  if (req.url !== '/index.html') {
    req.url = '/index.html'; // eslint-disable-line no-param-reassign
  }
  next('route');
});

// Finally run the server
// app.listen(port, '0.0.0.0', (err) => {
// app.listen(port, 'localhost', function (err) {
app.listen(port, '0.0.0.0', err => {
  if (err) {
    console.log(err); // eslint-disable-line
    return;
  }
  // So we can see a message whilst it bundles
  console.log('UI running on port ' + port + ', waiting for bundling to finish...'); // eslint-disable-line
});
