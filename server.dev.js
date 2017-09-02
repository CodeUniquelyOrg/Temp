require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "c:\\Projects\\Portal\\build\\public";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var path = __webpack_require__(1);

// ======================================================================
// __dirname is changed after webpack-ed to another directory
// so process.cwd() is used instead to determine the correct base directory
// Read more: https://nodejs.org/api/process.html#process_process_cwd
// ======================================================================
var CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  // app: path.resolve(CURRENT_WORKING_DIR, 'app'),
  // assets: path.resolve(CURRENT_WORKING_DIR, 'public', 'assets'),
  // compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
  // public: '/assets/', // use absolute path for css-loader?
  // modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),

  static: '/static/',

  // new ...
  root: path.resolve(CURRENT_WORKING_DIR),
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),
  // nodeModules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),

  build: path.resolve(CURRENT_WORKING_DIR, 'build'),
  public: path.resolve(CURRENT_WORKING_DIR, 'build', 'public'),

  assets: path.resolve(CURRENT_WORKING_DIR, 'src', 'assets'),
  img: path.resolve(CURRENT_WORKING_DIR, 'src', 'assets', 'img'),
  font: path.resolve(CURRENT_WORKING_DIR, 'src', 'assets', 'fonts'),

  // srcPath: path.resolve(CURRENT_WORKING_DIR, 'src'),
  // actions:    path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'actions'),
  // api:        path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'api'),
  // components: path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'components'),
  // containers: path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'containers'),
  // reducers:   path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'reducers'),
  // store:      path.resolve(CURRENT_WORKING_DIR, 'src', 'common', 'store'),

  // lib:        path.resolve(CURRENT_WORKING_DIR, 'src', 'lib'),
  // style:      path.resolve(CURRENT_WORKING_DIR, 'src', 'style'),
  // theme:      path.resolve(CURRENT_WORKING_DIR, 'src', 'theme'),

  src: path.resolve(CURRENT_WORKING_DIR, 'src'),
  client: path.resolve(CURRENT_WORKING_DIR, 'src', 'client'),
  server: path.resolve(CURRENT_WORKING_DIR, 'src', 'server'),
  common: path.resolve(CURRENT_WORKING_DIR, 'src', 'common'),
  mock: path.resolve(CURRENT_WORKING_DIR, 'src', 'server', 'mock')
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("extract-text-webpack-plugin");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("webpack-isomorphic-tools/plugin");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// ACTIONS
//
var SET_COUNTER = exports.SET_COUNTER = 'SET_COUNTER';
var INCREMENT_COUNTER = exports.INCREMENT_COUNTER = 'INCREMENT_COUNTER';
var DECREMENT_COUNTER = exports.DECREMENT_COUNTER = 'DECREMENT_COUNTER';

var set = exports.set = function set(value) {
  return {
    type: SET_COUNTER,
    payload: value
  };
};

var increment = exports.increment = function increment() {
  return {
    type: INCREMENT_COUNTER
  };
};

var decrement = exports.decrement = function decrement() {
  return {
    type: DECREMENT_COUNTER
  };
};

var incrementIfOdd = exports.incrementIfOdd = function incrementIfOdd() {
  return function (dispatch, getState) {
    var _getState = getState(),
        counter = _getState.counter;

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  };
};

var incrementAsync = exports.incrementAsync = function incrementAsync() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  return function (dispatch) {
    setTimeout(function () {
      dispatch(increment());
    }, delay);
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);
__webpack_require__(11);

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("babel-register");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _path = __webpack_require__(1);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(12);

var _express2 = _interopRequireDefault(_express);

var _qs = __webpack_require__(13);

var _qs2 = _interopRequireDefault(_qs);

var _webpack = __webpack_require__(2);

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = __webpack_require__(14);

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = __webpack_require__(15);

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpack3 = __webpack_require__(16);

var _webpack4 = _interopRequireDefault(_webpack3);

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(37);

var _reactRedux = __webpack_require__(7);

var _configureStore = __webpack_require__(38);

var _configureStore2 = _interopRequireDefault(_configureStore);

var _App = __webpack_require__(42);

var _App2 = _interopRequireDefault(_App);

var _counter = __webpack_require__(46);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// LETS load a SETTNG VALUE FROM SOMEHERE ABOUT THE ENV BEING USED

// load the config from webpack folder

var webpackConfig = (0, _webpack4.default)('development');
// console.log('WP-CONFIG: ', webpackConfig);

// import configureStore from '../common/store/configureStore';
// import App from '../common/containers/App';
// import { fetchCounter } from '../common/api/counter';

/* eslint-disable no-console, no-use-before-define */

var app = new _express2.default();
var port = 3000;

// Use this middleware to set up hot module reloading via webpack.
var compiler = (0, _webpack2.default)(webpackConfig);
app.use((0, _webpackDevMiddleware2.default)(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));
app.use((0, _webpackHotMiddleware2.default)(compiler));

var handleRender = function handleRender(req, res) {
  // Query our mock API asynchronously
  (0, _counter.fetchCounter)(function (apiResult) {
    // Read the counter from the request, if provided
    var params = _qs2.default.parse(req.query);
    var counter = parseInt(params.counter, 10) || apiResult || 0;

    // Compile an initial state
    var preloadedState = { counter: counter };

    // Create a new Redux store instance
    var store = (0, _configureStore2.default)(preloadedState);

    // Render the component to a string
    var html = (0, _server.renderToString)(_react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(_App2.default, null)
    ));

    // Grab the initial state from our Redux store
    var finalState = store.getState();

    // Send the rendered page back to the client
    res.send(renderFullPage(html, finalState));
  });
};

// This is fired every time the server side receives a request
app.use(handleRender);

var renderFullPage = function renderFullPage(html, preloadedState) {
  return '\n    <!doctype html>\n    <html>\n      <head>\n        <title>Redux Universal Example</title>\n      </head>\n      <body>\n        <div id="app">' + html + '</div>\n        <script>\n          window.__PRELOADED_STATE__ = ' + JSON.stringify(preloadedState).replace(/</g, '\\x3c') + '\n        </script>\n        <script src="/static/bundle.js"></script>\n      </body>\n    </html>\n    ';
};

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> \uD83C\uDF0E  Listening on port ' + port + '. Open up http://localhost:' + port + '/ in your browser.');
  }
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals __dirname, module, require, process */
var webpack = __webpack_require__(2);
var nodeExternals = __webpack_require__(17);

var path = __webpack_require__(1);

// const { ENV } = require('../config/env.js');
// const { isProduction, isDebug} = require('../config/app.js');

// LOAD THE SHARED CONFIG
// const config = require('../config/env.js');

// BETTER WAY TO DO THIS ...
// const ENV = 'development';

var PATHS = __webpack_require__(0);
var externals = __webpack_require__(18);
var resolve = __webpack_require__(20);
var plugins = __webpack_require__(21);
var rules = __webpack_require__(30);

// var config = require('../config/config.js');
module.exports = function () {
  var env = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { production: false, browser: false };


  var isProduction = "development" === 'production';
  var isBrowser = env.browser;

  /* eslint-disable */
  console.log('\n');
  console.log(env);
  console.log(env.browser);
  console.log("development");
  console.log('Running webpack in ' + "development" + ' mode on ' + (isBrowser ? 'browser' : 'server'));
  console.log('\n');
  /* eslint-enable */

  // 'webpack-hot-middleware/client',
  var hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
  var node = { __dirname: true, __filename: true };

  // ==========================================
  //   DEVELOPMENT VERSIONS OF WEBPACK CONFIG
  // ==========================================
  var devBrowserConfig = {
    devtool: 'eval',
    context: PATHS.app,
    entry: {
      app: [hotMiddlewareScript, './src/client/index.js']
    },
    node: node,
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

  var devServerConfig = {
    devtool: 'sourcemap',
    context: PATHS.app,
    entry: { server: './src/server/index.js' },
    target: 'node',
    node: node,
    externals: [nodeExternals()],
    // externals,
    output: {
      path: PATHS.compiled,
      filename: '[name].dev.js',
      publicPath: PATHS.public,
      libraryTarget: 'commonjs2'
    },
    module: { rules: rules({ production: false, browser: false }) },
    resolve: resolve,
    plugins: plugins({ production: false, browser: false })
  };

  // ==========================================
  //   PRODUCTION VERSIONS OF WEBPACK CONFIG
  // ==========================================
  // const prodBrowserConfig = {
  //   devtool: 'cheap-module-source-map',
  //   context: PATHS.src,         // client ????
  //   entry: {
  //     app: ['./src/client/index.js'],
  //     vendor: [
  //       'core-js',
  //       'axios',
  //       'react',
  //       'react-dom',
  //       'react-proptypes',
  //       'react-redux',
  //       'react-router',
  //       'react-router-dom',
  //       'redux',
  //       'redux-form',
  //       'redux-thunk',
  //     ],
  //     polyfill: [
  //       'eventsource-polyfill',
  //     ],
  //   },
  //   node,
  //   output: {
  //     path: PATHS.public,
  //     filename: '[chunkhash].js',
  //     chunkFilename: '[name].[chunkhash:6].js', // for code splitting. will work without but useful to set
  //     publicPath: PATHS.public
  //   },
  //   module: { rules: rules({ production: true, browser: true }) },
  //   resolve,
  //   plugins: plugins({ production: true, browser: true })
  // };

  // const prodServerConfig = {
  //   devtool: 'source-map',
  //   context: PATHS.src,   // ????
  //   entry: { server: './src/server/index.js' },
  //   target: 'node',
  //   node,
  //   externals,
  //   output: {
  //     path: PATHS.build,
  //     filename: '[name].js',
  //     publicPath: PATHS.public,
  //     libraryTarget: 'commonjs2'
  //   },
  //   module: { rules: rules({ production: true, browser: false }) },
  //   resolve,
  //   plugins: plugins({ production: true, browser: false })
  // };

  // // HACKED VERSION
  // const hackedConfig = {
  //   devtool: 'inline-source-map',
  //   entry: [
  //     'webpack-hot-middleware/client',
  //     './src/client/index.js',
  //   ],
  //   output: {
  //     path: PATHS.public,
  //     filename: 'bundle.js',
  //     publicPath: PATHS.static,
  //   },
  //   plugins: [
  //     new webpack.HotModuleReplacementPlugin()
  //   ],
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         loader: 'babel-loader',
  //         exclude: /node_modules/,
  //         include: PATHS.src,   // client ????
  //         options: {
  //           presets: [ 'react-hmre' ]
  //         }
  //       }
  //     ]
  //   }
  // };

  var devConfig = isBrowser ? devBrowserConfig : devServerConfig;
  // const prodConfig = isBrowser ? prodBrowserConfig : prodServerConfig;
  var configuration = devConfig; // isProduction ? prodConfig : devConfig;

  // export the desired configuration
  return configuration;
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
// handle clling fo External Libraries correctly - do not bundle
// Basicaly treat anything in node_modules as an externally called lib (FOR NOW)
//
var fs = __webpack_require__(19);

var externalModules = fs.readdirSync('node_modules').filter(function (x) {
  return ['.bin'].indexOf(x) === -1;
}).reduce(function (acc, cur) {
  return Object.assign(acc, _defineProperty({}, cur, 'commonjs ' + cur));
}, {});

module.exports = externalModules;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PATHS = __webpack_require__(0);

module.exports = {
  modules: [PATHS.client, PATHS.modules],
  extensions: ['.js', '.css', '.json', '.pcss', '.html']
  // alias:{
  //   // root: PATHS.root,
  //   // node: PATHS.modules,
  //
  //   src: PATHS.src,
  //
  //   actions: PATHS.actions,
  //   api: PATHS.api,
  //   assets: PATHS.assets,
  //   components: PATHS.components,
  //   containers: PATHS.containers,
  //   reducers: PATHS.reducers,
  //   store: PATHS.store,
  //
  //   font: PATHS.font,
  //   img: PATHS.img,
  //
  //   client:  PATHS.client,
  //   server:  PATHS.server,
  //   common:  PATHS.common,
  //
  //   // lib: PATHS.lib,
  //   // style: PATHS.style,
  //   // theme: PATHS.theme,
  // },
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var webpack = __webpack_require__(2);
var FaviconsWebpackPlugin = __webpack_require__(22);
var WebpackOnBuildPlugin = __webpack_require__(23);
var CompressionPlugin = __webpack_require__(24);
var ExtractTextPlugin = __webpack_require__(4);
var HtmlWebpackPlugin = __webpack_require__(25);
var CopyWebpackPlugin = __webpack_require__(26);
var ManifestPlugin = __webpack_require__(27);
var NofifierPlugin = __webpack_require__(28);

var webpackIsomorphicToolsConfig = __webpack_require__(29);
var WebpackIsomorphicToolsPlugin = __webpack_require__(5);
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$production = _ref.production,
      production = _ref$production === undefined ? false : _ref$production,
      _ref$browser = _ref.browser,
      browser = _ref$browser === undefined ? false : _ref$browser;

  var bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  var compress = { warnings: false };
  var compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };

  var plugins = [];

  if (!production && !browser) {
    return [new webpack.EnvironmentPlugin(['NODE_ENV']), new webpack.DefinePlugin(compileTimeConstantForMinification), new NofifierPlugin({
      title: 'Contact Forms',
      suppressSuccess: true, // only first success is shown, after a fail
      // suppressWarnings: true,    // show warnings too
      sound: true, // I want some sounds
      successSound: 'Morse', // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
      warningSound: 'Tink', // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
      failureSound: 'Basso', // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
      logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
      activateTerminalWindow: true // Take me to terminal on errors
    }), new webpack.BannerPlugin(bannerOptions), webpackIsomorphicToolsPlugin.development()];
  }

  if (!production && browser) {
    return [new webpack.EnvironmentPlugin(['NODE_ENV']), new NofifierPlugin({
      title: 'Contact Forms',
      suppressSuccess: true, // only first success is shown, after a fail
      // suppressWarnings: true,    // show warnings too
      sound: true, // I want some sounds
      successSound: 'Morse', // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
      warningSound: 'Tink', // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
      failureSound: 'Basso', // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
      logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
      activateTerminalWindow: true // Take me to terminal on errors
    }), new webpack.DefinePlugin(compileTimeConstantForMinification), new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin(), webpackIsomorphicToolsPlugin.development()];
  }

  // if (production && !browser) {
  //   return [
  //     new webpack.EnvironmentPlugin(['NODE_ENV']),
  //     new webpack.DefinePlugin(compileTimeConstantForMinification),
  //     new webpack.BannerPlugin(bannerOptions),
  //     new CompressionPlugin({
  //       asset: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: /\.js$|\.css$|\.html$/,
  //       threshold: 10240,
  //       minRatio: 0.8,
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({ compress }),
  //     webpackIsomorphicToolsPlugin,
  //   ];
  // }

  // if (production && browser) {
  //   return [
  //     new webpack.EnvironmentPlugin(['NODE_ENV']),
  //     new webpack.DefinePlugin(compileTimeConstantForMinification),
  //     new webpack.optimize.CommonsChunkPlugin({
  //       name: ['app', 'vendor', 'polyfill'],
  //     }),
  //     new ExtractTextPlugin({
  //       filename: '[contenthash].css',
  //       ignoreOrder: true,
  //       allChunks: true
  //     }),
  //     new CompressionPlugin({
  //       asset: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: /\.js$|\.css$|\.html$/,
  //       threshold: 10240,
  //       minRatio: 0.8,
  //     }),
  //     new webpack.optimize.UglifyJsPlugin({ compress }),
  //     new ManifestPlugin({
  //       fileName: 'manifest.json'
  //     }),
  //     webpackIsomorphicToolsPlugin,
  //   ];
  // }

  return [];

  // ALL Builds
  // plugins.push( new webpack.EnvironmentPlugin(['NODE_ENV']) );
  // plugins.push( new webpack.DefinePlugin(compileTimeConstantForMinification));

  // if (!browser) {
  //   plugins.push( new webpack.BannerPlugin(bannerOptions));
  // }

  // will need to optimize chunks if a browser is delivering them
  // if(production && browser) {
  //   plugins.push(
  //     new webpack.optimize.CommonsChunkPlugin({
  //       name: ['app', 'vendor', 'polyfill'],
  //     })
  //   );
  // }

  // if (production) {
  //   plugins.push(
  //     new CompressionPlugin({
  //       asset: '[path].gz[query]',
  //       algorithm: 'gzip',
  //       test: /\.js$|\.css$|\.html$/,
  //       threshold: 10240,
  //       minRatio: 0.8,
  //     })
  //   );
  // }

  // if (!production) {
  //   plugins.push(
  //     new ExtractTextPlugin({
  //       filename: '[name].css',
  //       ignoreOrder: true,
  //       disable: false,
  //       allChunks: true,
  //     })
  //   );
  // }
  // if (production) {
  //   plugins.push(
  //     new ExtractTextPlugin({
  //       filename: '[contenthash].css',
  //       ignoreOrder: true,
  //       allChunks: true
  //     })
  //   );
  // }

  // if (production) {
  //   plugins.push( new webpack.optimize.UglifyJsPlugin({ compress }) );
  // }
  // if (production && browser) {
  //   plugins.push(new ManifestPlugin({ fileName: 'manifest.json' }));
  // }

  // if (!production) {
  //   plugins.push(
  //     new NofifierPlugin({
  //       title: 'Contact Forms',
  //       suppressSuccess: true,        // only first success is shown, after a fail
  //       // suppressWarnings: true,    // show warnings too
  //       sound: true,                  // I want some sounds
  //       successSound: 'Morse',        // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
  //       warningSound: 'Tink',         // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
  //       failureSound: 'Basso',        // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
  //       logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
  //       activateTerminalWindow: true,  // Take me to terminal on errors
  //     })
  //   );

  //   plugins.push(new webpack.HotModuleReplacementPlugin());
  //   plugins.push(new webpack.NoEmitOnErrorsPlugin());
  // }

  // return plugins;
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("favicons-webpack-plugin");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("on-build-webpack");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("compression-webpack-plugin");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("html-webpack-plugin");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("copy-webpack-plugin");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("webpack-manifest-plugin");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("webpack-build-notifier");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var WebpackIsomorphicToolsPlugin = __webpack_require__(5);

// https://github.com/catamphetamine/webpack-isomorphic-tools#a-working-example
module.exports = {
  assets: {
    images: {
      extensions: ['jpeg', 'jpg', 'png', 'gif'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    fonts: {
      extensions: ['woff', 'woff2', 'ttf', 'eot'],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },

    style_modules: {
      extensions: ['css', 'pcss', 'scss'],
      filter: function filter(module, regex, options, log) {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // which outputs `module`s with `module.name == asset_path`,
          // but those `module`s do not contain CSS text.
          // The `module`s containing CSS text are
          // the ones loaded with Webpack "css-loader".
          // (which have kinda weird `module.name`)
          // Therefore using a non-default `filter` function here.
          return WebpackIsomorphicToolsPlugin.styleLoaderFilter(module, regex, options, log);
        }
        // In production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to the correct asset path
        return regex.test(module.name);
      },

      // How to correctly transform `module.name`s
      // into correct asset paths
      path: function path(module, options, log) {
        if (options.development) {
          // In development mode there's Webpack "style-loader",
          // so `module.name`s of the `module`s created by Webpack "css-loader"
          // (those picked by the `filter` function above)
          // will be kinda weird, and this path extractor extracts
          // the correct asset paths from these kinda weird `module.name`s
          return WebpackIsomorphicToolsPlugin.styleLoaderPathExtractor(module, options, log);
        }

        // in production mode there's no Webpack "style-loader",
        // so `module.name`s will be equal to correct asset paths
        return module.name;
      },

      // How to extract these Webpack `module`s' javascript `source` code.
      // Basically takes `module.source` and modifies its `module.exports` a little.
      parser: function parser(module, options, log) {
        if (options.development) {
          // In development mode it adds an extra `_style` entry
          // to the CSS style class name map, containing the CSS text
          return WebpackIsomorphicToolsPlugin.cssModulesLoaderParser(module, options, log);
        }

        // In production mode there's Webpack Extract Text Plugin
        // which extracts all CSS text away, so there's
        // only CSS style class name map left.
        return module.source;
      }
    }

  }
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var javascript = __webpack_require__(31);
var image = __webpack_require__(32);
var css = __webpack_require__(33);

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$production = _ref.production,
      production = _ref$production === undefined ? false : _ref$production;

  return [javascript({ production: production }), css({ production: production }), image()];
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PATHS = __webpack_require__(0);

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$production = _ref.production,
      production = _ref$production === undefined ? false : _ref$production,
      _ref$browser = _ref.browser,
      browser = _ref$browser === undefined ? false : _ref$browser;

  var enableHotModuleReplacement = !production && browser;

  var createPresets = function createPresets(enableHotModuleReplacement) {
    var presets = ['es2015', 'react', 'stage-0'];
    return enableHotModuleReplacement ? ['react-hmre'].concat(presets) : presets;
  };

  var presets = createPresets(enableHotModuleReplacement);

  var plugins = production ? ['transform-react-remove-prop-types', 'transform-react-constant-elements', 'transform-react-inline-elements'] : [];

  return {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
      presets: presets,
      plugins: plugins
    },
    exclude: PATHS.modules
  };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var PATHS = __webpack_require__(0);

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 10000 : _ref$limit;

  return {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url-loader',
    options: { name: '[hash].[ext]', limit: limit },
    include: PATHS.src
  };
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var path = __webpack_require__(1);
var ExtractTextPlugin = __webpack_require__(4);
var postcssImport = __webpack_require__(34);
var postcssCssnext = __webpack_require__(35);
var postcssReporter = __webpack_require__(36);

var PATHS = __webpack_require__(0);

module.exports = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$production = _ref.production,
      production = _ref$production === undefined ? false : _ref$production,
      _ref$browser = _ref.browser,
      browser = _ref$browser === undefined ? false : _ref$browser;

  /*
   * modules: boolean - Enable/Disable CSS Modules
   * importLoaders: number - Number of loaders applied before CSS loader
   *
   * Read more about css-loader options
   * https://webpack.js.org/loaders/css-loader/#options
   *
   * For server-side rendering we use css-loader/locals as we do not want to
   * embed CSS. However, we still require the mappings to insert as className in
   * our views.
   *
   * Referenced from: https://github.com/webpack-contrib/css-loader#css-scope
   *
   * For prerendering with extract-text-webpack-plugin you should use
   * css-loader/locals instead of style-loader!css-loader in the prerendering bundle.
   * It doesn't embed CSS but only exports the identifier mappings.
   */
  var localIdentName = 'localIdentName=[name]__[local]___[hash:base64:5]';

  var createCssLoaders = function createCssLoaders(embedCssInBundle) {
    return [{
      loader: embedCssInBundle ? 'css-loader' : 'css-loader/locals',
      options: {
        localIdentName: localIdentName,
        sourceMap: true,
        modules: true,
        importLoaders: 1
      }
    }, {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss',
        plugins: [postcssImport({ path: path.resolve(PATHS.src, './css') }), postcssCssnext({ browsers: ['> 1%', 'last 2 versions'] }), postcssReporter({ clearMessages: true })]
      }
    }];
  };

  var createBrowserLoaders = function createBrowserLoaders(extractCssToFile) {
    return function (loaders) {
      if (extractCssToFile) {
        return ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: loaders
        });
      }
      return [{ loader: 'style-loader' }].concat(_toConsumableArray(loaders));
    };
  };

  var serverLoaders = createCssLoaders(false);
  var browserLoaders = createBrowserLoaders(production)(createCssLoaders(true));

  return {
    test: /\.css$/,
    use: browser ? browserLoaders : serverLoaders,
    include: PATHS.src
  };
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("postcss-import");

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = require("postcss-cssnext");

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("postcss-reporter");

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(3);

var _reduxThunk = __webpack_require__(39);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducers = __webpack_require__(40);

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var configureStore = function configureStore(preloadedState) {
  var store = (0, _redux.createStore)(_reducers2.default, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));

  if (false) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', function () {
      var nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

exports.default = configureStore;

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = require("redux-thunk");

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(3);

var _counter = __webpack_require__(41);

var _counter2 = _interopRequireDefault(_counter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
// Reducer Index - Combine all here ...
//
var rootReducer = (0, _redux.combineReducers)({
  counter: _counter2.default
});

exports.default = rootReducer;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _actions = __webpack_require__(8);

var counter = function counter() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var action = arguments[1];

  switch (action.type) {
    case _actions.SET_COUNTER:
      return action.payload;
    case _actions.INCREMENT_COUNTER:
      return state + 1;
    case _actions.DECREMENT_COUNTER:
      return state - 1;
    default:
      return state;
  }
};

exports.default = counter;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = __webpack_require__(3);

var _reactRedux = __webpack_require__(7);

var _Counter = __webpack_require__(43);

var _Counter2 = _interopRequireDefault(_Counter);

var _actions = __webpack_require__(8);

var CounterActions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    counter: state.counter
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return (0, _redux.bindActionCreators)(CounterActions, dispatch);
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_Counter2.default);

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(6);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(44);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _style = __webpack_require__(45);

var _style2 = _interopRequireDefault(_style);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Counter = function Counter(_ref) {
  var increment = _ref.increment,
      incrementIfOdd = _ref.incrementIfOdd,
      incrementAsync = _ref.incrementAsync,
      decrement = _ref.decrement,
      counter = _ref.counter;
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'p',
      null,
      'Clicked: ',
      counter,
      ' times \xA0',
      _react2.default.createElement(
        'button',
        { onClick: increment },
        '+'
      ),
      '\xA0',
      _react2.default.createElement(
        'button',
        { onClick: decrement },
        '-'
      ),
      '\xA0',
      _react2.default.createElement(
        'button',
        { onClick: incrementIfOdd },
        'Increment if odd'
      ),
      '\xA0',
      _react2.default.createElement(
        'button',
        { onClick: function onClick() {
            return incrementAsync();
          } },
        'Increment async'
      )
    ),
    _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        'Helo World'
      )
    )
  );
};

Counter.propTypes = {
  increment: _propTypes2.default.func.isRequired,
  incrementIfOdd: _propTypes2.default.func.isRequired,
  incrementAsync: _propTypes2.default.func.isRequired,
  decrement: _propTypes2.default.func.isRequired,
  counter: _propTypes2.default.number.isRequired
};

exports.default = Counter;

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = {
	"root": "localIdentName-style__root___3UNaS"
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
// API
//
var getRandomInt = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var fetchCounter = exports.fetchCounter = function fetchCounter(callback) {
  // Rather than immediately returning, we delay our code with a timeout to simulate asynchronous behavior
  setTimeout(function () {
    callback(getRandomInt(1, 100));
  }, 500);

  // In the case of a real world API call, you'll normally run into a Promise like this:
  // API.getUser().then(user => callback(user))
};

/***/ })
/******/ ]);
//# sourceMappingURL=server.dev.js.map