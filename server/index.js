// process.env.NODE_ENV = 'development';
// process.env.BABEL_ENV = 'development';

const webpack = require('webpack');
const express = require('express');
const compression = require('compression');
const path = require('path');

// are we building - deeopment / debugging version
import { isDevelopment } from '../config/app';

// What relative path is the UI content to be built into
const publicPath = path.join(__dirname, 'build');

// Reference the config file that was used
const webpackConfiguration = require('../webpack/webpack.config');
// const config = require('./webpack.config.js');

// var port = process.env.APP_PORT || 4000;
// var port = config.devServer.port;

// milli-seconds in one hour - in development we cache contents for an hour
// extend this duration by a few hours for production ?????
const oneHour = 3600000;

if ( isDevelopment) {
  // move it all inside this section
}

// ===============================================================================
// 'webpack-dev-middleware' configuration
// ===============================================================================
var compilerConfig = {
  publicPath: webpackConfiguration.output.publicPath,
  noInfo: true,
  // quiet: true,
  stats: {
    colors: true
  }
};

// ===============================================================================
// 'webpack-hot-middleware' configuration
// ===============================================================================
// log: A function used to log lines, pass false to disable. Defaults to console.log
// path: The path the middleware serves event stream on, must match the client setting
// heartbeat: Frequency of heartbeat updates => client to keep the connection alive
// ===============================================================================
var hotConfig = {
  // log: false // console.log
};

// static path configuration
var publicConfig = {
  dotfile: 'ignore',
  etag: true,
  index: false,
  maxAge: oneHour,
  lastModified: true
};

var compiler = webpack(config);

// ========================================
// Main Website Express V 4.x for UI pages
// ========================================
var app = express();

// enable gzip compression on the server
app.use(compression());

// Load the various webpack middlewares
var devMiddleware = require('webpack-dev-middleware')(compiler, compilerConfig);
app.use(devMiddleware);

// Load the various webpack middlewares
var hotMiddleware = require('webpack-hot-middleware')(compiler, hotConfig);
app.use(hotMiddleware);

// serve mocks
// app.use('/src/mock', express.static(path.resolve(__dirname, 'src', 'mock')));

// serve static file contents
app.use(express.static(publicPath, publicConfig));

// deal with requested paths under the public path
app.use(function(req, res, next) {
  if (req.url !== '/index.html') {
    req.url = '/index.html';
  }
  next('route');
});

// Finally run the server
// app.listen(port, '0.0.0.0', (err) => {
// app.listen(port, 'localhost', function (err) {
app.listen(port, '0.0.0.0', function (err) {
  if (err) {
    console.log(err); // eslint-disable-line
    return;
  }
  // So we can see a message whilst it bundles
  console.log('UI running on port ' + port + ', waiting for bundling to finish...'); // eslint-disable-line
});
