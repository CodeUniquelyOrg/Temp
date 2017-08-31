/* globals __dirname, module, require, process */
const webpack = require('webpack');

var path = require('path');

// const { ENV } = require('../config/env.js');
// const { isProduction, isDebug} = require('../config/app.js');

// LOAD THE SHARED CONFIG
// const config = require('../config/env.js');

// BETTER WAY TO DO THIS ...
// const ENV = 'development';

const PATHS = require('./webpack/paths');
const externals = require('./webpack/externals');
const resolve = require('./webpack/resolve');
const plugins = require('./webpack/plugins');
const rules = require('./webpack/rules');

// var config = require('../config/config.js');
module.exports = (env = { production: false, browser: false }) => {

  const isProduction = process.env.NODE_ENV === 'production';
  const isBrowser = env.browser;

  /* eslint-disable */
  console.log('\n');
  console.log(env);
  console.log(env.browser);
  console.log(process.env.NODE_ENV);
  console.log(`Running webpack in ${process.env.NODE_ENV} mode on ${isBrowser ? 'browser': 'server'}`);
  console.log('\n');
  /* eslint-enable */

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
    resolve,
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
    context: PATHS.src,         // client ????
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
    resolve,
    plugins: plugins({ production: true, browser: true })
  };

  const prodServerConfig = {
    devtool: 'source-map',
    context: PATHS.src,   // ????
    entry: { server: './src/server/index.js' },
    target: 'node',
    node,
    externals,
    output: {
      path: PATHS.build,
      filename: '[name].js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: { rules: rules({ production: true, browser: false }) },
    resolve,
    plugins: plugins({ production: true, browser: false })
  };

  // HACKED VERSION
  const hackedConfig = {
    devtool: 'inline-source-map',
    entry: [
      'webpack-hot-middleware/client',
      './src/client/index.js',
    ],
    output: {
      path: PATHS.public,
      filename: 'bundle.js',
      publicPath: PATHS.static,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          include: PATHS.src,   // client ????
          options: {
            presets: [ 'react-hmre' ]
          }
        }
      ]
    }
  };

  const devConfig = isBrowser ? devBrowserConfig : devServerConfig;
  const prodConfig = isBrowser ? prodBrowserConfig : prodServerConfig;
  const configuration = isProduction ? prodConfig : devConfig;

  console.log('CONFIG IS: ', hackedConfig); // eslint-disable-line no-console
  console.log('Rules are ', hackedConfig.module.rules); // eslint-disable-line no-console

  // export the desired configuration
  return hackedConfig; // configuration;
};
