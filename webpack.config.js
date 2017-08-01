/* globals __dirname, module, require, process */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var NofifierPlugin = require('webpack-build-notifier');
var autoprefixer = require('autoprefixer');
var path = require('path');

var config = require('./config.js');

// Define the environment
var env = 'development';

// ==============================
//  Paths
// ==============================
var rootPath          = path.resolve( __dirname );
var nodeModulesPath   = path.resolve( __dirname, 'node_modules');
var buildPath         = path.resolve( __dirname, 'build');
var assetsPath        = path.resolve( __dirname, 'assets' );
var imgPath           = path.resolve(assetsPath, 'img');
var fontPath          = path.resolve(assetsPath, 'fonts');
var srcPath           = path.resolve( __dirname, 'src' );
// var ngPath            = path.resolve( srcPath, 'ng' );
var stylePath         = path.resolve( srcPath, 'style' );
var componentsPath    = path.resolve( srcPath, 'components' );
var actionPath        = path.resolve( srcPath, 'actions' );
var reducerPath       = path.resolve( srcPath, 'reducers' );

// var filterPath        = path.resolve( srcPath, 'filters' );
// var servicesPath      = path.resolve(  ngPath, 'services' );
// var validationsPath   = path.resolve(  ngPath, 'validations' );

// define a port to be used
var PORT = process.env.APP_PORT || config.server.port; // 4000;

// ==============================
//  Plugins
// ==============================
var plugins = [

  new webpack.DefinePlugin({
    'process.env': {
      ENV: JSON.stringify(env),
      NODE_ENV: JSON.stringify(env),
    },
  }),

  new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.optimize.OccurrenceOrderPlugin(),

  new webpack.HotModuleReplacementPlugin(),

  new NofifierPlugin({
    title: 'Contact Forms',
    suppressSuccess: true,        // only first success is shown, after a fail
    // suppressWarnings: true,    // show warnings too
    sound: true,                  // I want some sounds
    successSound: 'Morse',        // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
    warningSound: 'Tink',         // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
    failureSound: 'Basso',        // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
    logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
    activateTerminalWindow: true,  // Take me to terminal on errors
  }),

  new FaviconsWebpackPlugin({
    logo: path.resolve(assetsPath,'img','favicon.jpg'),
    prefix: 'icons/',
    // Emit all stats of the generated icons
    emitStats: false,
    // The name of the json containing all favicon information
    // statsFilename: 'iconstats-[hash].json',
    // Generate a cache file with control hashes and
    // don't rebuild the favicons until those hashes change
    persistentCache: true,
    // Inject the html into the html-webpack-plugin
    inject: true,
    // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    // background: '#fff',
    // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    title: 'Portal',
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      favicons: true,
      firefox: true,
      coast: false,
      opengraph: false,
      twitter: false,
      yandex: false,
      windows: false,
    },
  }),

  new HtmlWebpackPlugin({
    inject: true,
    title: 'Portal',
    template: path.resolve(assetsPath, 'index.html')
  }),

  new ExtractTextPlugin('bundle.[hash].css', {
    allChunks: true
  }),

  // copy HACKS for 'crappy' IE Browsers
  // import 'assets/js/json3.min.js';
  // import 'assets/js/eventsource.min.js';
  new CopyWebpackPlugin([
    { from: path.resolve(assetsPath, 'js'), to: 'js' },
  ]),

  // optimization plugins
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].bundle.js'),

  new webpack.optimize.OccurenceOrderPlugin(),

  // https://github.com/webpack/docs/wiki/optimization#deduplication
  new webpack.optimize.DedupePlugin(),

  // new webpack.optimize.UglifyJsPlugin({
  //   // sourceMap: false,
  //   comments:true,
  //   // minimize: true,
  //   compress: {
  //     warnings: false,
  //     drop_console: true,   // eslint-disable-line camelcase
  //     drop_debugger: true,  // eslint-disable-line camelcase
  //     dead_code: true       // eslint-disable-line camelcase
  //   },
  //   output: {
  //     comments: false
  //   },
  //   // mangle: false
  // }),

  new webpack.NoErrorsPlugin(),
];

// ==============================
//  Pre-loaders
// ==============================
var preLoaders = [
  {
    test: /\.js$/,
    loaders: ['eslint'],
    exclude: [nodeModulesPath],
  },
];

// ==============================
//  Loaders
// ==============================
var loaders = [
  {
    test: /\.js$/i,
    loader: 'babel',
    include: [
      path.resolve(__dirname, 'src'),
    ],
  },
  { test: /\.html$/i, loader: 'raw!htmlclean' },
  { test: /\.ico($|\?)/i, loader: 'file', query:{ name:'[path][name].[ext]', context:assetsPath } },
  { test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i, loader: 'file', query: { name: 'img/[name].[ext]', context: assetsPath } },
  { test: /\.svg($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/i, loader: 'file', query:{ name:'[path][name].[ext]',context:assetsPath } },
  { test: /\.css$/i, loader: ExtractTextPlugin.extract('style', 'css?!postcss') },
  { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
  { test: /\.scss$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
  { test: /\.json$/i, loader: 'json' },
];

module.exports = {

  port: PORT,

  // 'eval', 'source-map', hidden-source-map, inline-source-map, eval-source-map, cheap-source-map
  devtool: 'eval',

  resolve: {
    alias:{
      root: rootPath,
      node: nodeModulesPath,
      assets: assetsPath,
      img: imgPath,
      font: fontPath,
      src: srcPath,
      components: componentsPath,
      actions: actionPath,
      reducers: reducerPath,
      style: stylePath,
    },
    extensions: ['', '.js', '.json', '.html' ],
  },

  entry: {
    app: [
      'babel-polyfill',
      'webpack/hot/dev-server',
      'webpack-hot-middleware/client?overlay=false',
      path.resolve(srcPath, 'index.js'),
    ],
    vendor: [
      'core-js',
      'react',
      'react-dom',
      'react-proptypes',
    ],
  },

  output: {
    path: buildPath,
    filename: '[name].[hash].js',
    publicPath: '/',
  },

  postcss: [
    autoprefixer({
      browsers: ['last 4 versions', '> 2%', 'ie > 10', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4']
    }),
  ],

  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },

  plugins: plugins,

  module: {
    preLoaders: preLoaders,
    loaders: loaders,
  },
};
