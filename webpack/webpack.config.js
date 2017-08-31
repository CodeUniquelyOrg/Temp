/* globals __dirname, module, require, process */

var path = require('path');

// const { ENV } = require('../config/env.js');
// const { isProduction, isDebug} = require('../config/app.js');

// LOAD THE SHARED CONFIG
// const config = require('../config/env.js');

// BETTER WAY TO DO THIS ...
// const ENV = 'development';

const PATHS = require('./paths');
const externals = require('./externals');
const resolve = require('./resolve');
const plugins = require('./plugins');
const rules = require('./rules');

// var config = require('../config/config.js');
module.exports = (env = { production: false, browser: false }) => {

  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = env.browser;

  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser': 'server'}`);

  // 'webpack-hot-middleware/client',
  const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  const node = { __dirname: true, __filename: true };

  // ==========================================
  //   DEVELOPMENT VERSIONS OF WEBPACK CONFIG
  // ==========================================
  const devBrowserConfig = {
    devtool: 'eval',
    context: PATHS.app,
    entry: {
      app: [hotMiddlewareScript, './src/client/index.js']
    },
    node,
    output: {
      // chunkFilename: '[id].chunk.js',
      // path: PATH.build,
      // filename: '[name].[hash].js',
      // publicPath: '/',
      path: PATHS.public,
      filename: '[name].js',
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: false, browser: true }) },
    resolve: resolve,
    plugins: plugins({ production: false, browser: true })
  };

  const devServerConfig = {
    devtool: 'sourcemap',
    context: PATHS.app,
    entry: { server: './src/server/index.js' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2',
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve,
    plugins: plugins({ production: false, browser: false })
  };

  // ==========================================
  //   PRODUCTION VERSIONS OF WEBPACK CONFIG
  // ==========================================
  const prodBrowserConfig = {
    devtool: 'cheap-module-source-map',
    context: PATHS.app,
    entry: {
      app: ['./src/client/index.js'],
      vendor: [
        'core-js',
        'axios',
        'react',
        'react-dom',
        'react-proptypes',
        'react-redux',
        'react-router',
        'react-router-dom',
        'redux',
        'redux-form',
        'redux-thunk',
      ],
      polyfill: [
        'eventsource-polyfill',
      ],
    },
    node,
    output: {
      path: PATHS.public,
      filename: '[chunkhash].js',
      chunkFilename: '[name].[chunkhash:6].js', // for code splitting. will work without but useful to set
      publicPath: PATHS.public
    },
    module: { rules: rules({ production: true, browser: true }) },
    resolve: resolve,
    plugins: plugins({ production: true, browser: true })
  };

  const prodServerConfig = {
    devtool: 'source-map',
    context: PATHS.app,
    entry: { server: './src/server/index.js' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: { rules: rules({ production: true, browser: false }) },
    resolve,
    plugins: plugins({ production: true, browser: false })
  };

  const devConfig = isBrowser ? devBrowserConfig : devServerConfig;
  const prodConfig = isBrowser ? prodBrowserConfig : prodServerConfig;
  const configuration = isProduction ? prodConfig : devConfig;

  // export the desired configuration
  return configuration;
};
