process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';

/* globals __dirname, module, require */
var webpack = require('webpack');
var fs = require('fs');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var AerAppManifestWebpackPlugin = require('aeriandi-appmanifest-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var autoprefixer = require('autoprefixer');
var WebpackOnBuildPlugin = require('on-build-webpack');
var archiver = require('archiver');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// Define the environment
var env = 'production';

// ==============================
//  Paths
// ==============================
var rootPath           = path.resolve( __dirname );
var nodeModulesPath    = path.resolve( __dirname, 'node_modules');
var buildPath          = path.resolve( __dirname, 'build');
var srcPath            = path.resolve( __dirname, 'src' );
var ngPath             = path.resolve( srcPath, 'ng' );
var stylePath          = path.resolve( srcPath, 'style' );
var filterPath         = path.resolve( srcPath, 'filters' );
var assetsPath         = path.resolve( srcPath, 'assets' );
var servicesPath       = path.resolve(  ngPath, 'services' );
var componentsPath     = path.resolve(  ngPath, 'components' );
var validationsPath    = path.resolve(  ngPath, 'validations' );

var empty = JSON.stringify('');

// ==============================
//  Plugins
// ==============================
var plugins = [

  new webpack.DefinePlugin({
    'process.env': {
      ENV: JSON.stringify(env),
      NODE_ENV: JSON.stringify(env)
    },
    BUILD_CONFIG: {
      BRAND: JSON.stringify('Lloyds'),
      BUILD_VCS_NUMBER: empty,
      PACKAGE: {
        NAME: empty,
        DESCRIPTION: empty,
        VERSION: empty
      },
      AER_COMMS: {
        LIQUID_ENVIRONMENT: JSON.stringify('secure'),
        MOCK: false
      }
    }
  }),

  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
  }),
  new CleanWebpackPlugin(['build'], {
    root: rootPath,
    dry: false
  }),

  new webpack.IgnorePlugin(/\.\/locale$/),
  new AerAppManifestWebpackPlugin({
    version: '1.0.0',
    hash: '',
    description: 'forms',
    defaultEntryPoint: 'index.html',
    unsecuredResources: []
  }),

  new FaviconsWebpackPlugin({
    logo: path.resolve(assetsPath,'img','favicon.png'),
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
    title: 'Card Application',
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
      windows: false
    }
  }),

  new HtmlWebpackPlugin({
    inject: true,
    title: 'CardNet',
    template: path.resolve(assetsPath, 'index.html'),
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }
  }),

  new ExtractTextPlugin('bundle.css?_=[hash]', {
    allChunks: true
  }),

  // copy HACKS for 'crappy' IE Browsers
  // import 'assets/js/console-sham.js';
  // import 'assets/js/json3.min.js';
  // import 'assets/js/core.min.js';
  // import 'assets/js/eventsource.min.js';
  new CopyWebpackPlugin([
    { from: path.resolve(assetsPath, 'js'), to: 'js' },
  ]),

  new WebpackOnBuildPlugin(function() {
    var outFilename = 'LloydsForms.zip';
    var output = fs.createWriteStream(path.join(__dirname, outFilename));
    var archive = archiver('zip');
    archive.pipe(output);
    archive.directory('build', '');
    archive.finalize();
  }),

  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    comments: false,
    minimize: true,
    mangle: false,
    compress: {
      warnings: false,
      drop_console: true,    // eslint-disable-line camelcase
      drop_debugger: true,   // eslint-disable-line camelcase
      dead_code: true        // eslint-disable-line camelcase
    },
    output: {
      comments: false
    },
  }),

  // Optimize the Occurance Order
  new webpack.optimize.OccurenceOrderPlugin(),

  // https://github.com/webpack/docs/wiki/optimization#deduplication
  new webpack.optimize.DedupePlugin(),

  // split the 'vendor' and 'app' portions of the deployment
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js?_=[hash]'),

  // Also build the GZIP versions of the 'big files', to be served by NGINIX
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  }),

  // new webpack.NoErrorsPlugin()
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
      path.resolve(__dirname, 'node_modules/aeriandi-comms-library'),
    ]
  },

  { test: /\.html$/i, loader: 'raw!htmlclean' },
  { test: /\.ico($|\?)/i, loader: 'file', query:{ name:'[path][name].[ext]', context:assetsPath } },
  // { test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i, loader: 'file', query:{ name:'[path][name].[ext]', context:assetsPath } },
  { test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i, loader: 'file', query: { name: 'img/[name].[ext]', context: assetsPath } },
  { test: /\.svg($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/i, loader: 'file', query:{ name:'[path][name].[ext]',context:assetsPath } },
  { test: /\.css$/i,  loader: ExtractTextPlugin.extract('style', 'css!postcss') },
  { test: /\.less$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!less') },
  { test: /\.scss$/i, loader: ExtractTextPlugin.extract('style', 'css!postcss!sass') },
  { test: /\.json$/i, loader: 'json' }
];

module.exports = {

  devtool: 'source-map',

  resolve: {
    alias:{
      root: rootPath,
      src: srcPath,
      code: ngPath,
      node: nodeModulesPath,
      assets: assetsPath,
      img: path.resolve(assetsPath, 'img'),
      font: path.resolve(assetsPath, 'fonts'),
      style: stylePath,
      filter: filterPath,
      services: servicesPath,
      components: componentsPath,
      validations: validationsPath
    },
    extensions: ['', '.js', '.json', '.html' ]
  },

  entry: {
    // app: path.resolve(srcPath, 'index.js'),
    app: ['babel-polyfill', path.resolve(srcPath, 'index.js')],
    vendor: [
      'angular',
      'angular-messages',
      'angular-resource',
      'angular-sanitize',
      'angular-ui-bootstrap',
      'angular-ui-router',
      'angular-validation',
      'bluebird',
      'jquery',
      'ngstorage',
      'ui-select'
    ]
  },

  output: {
    path: buildPath,
    // filename: 'bundle.js',
    filename: '[name].js?_=[hash]',
    pathinfo: false
  },

  postcss: [
    autoprefixer({
      // browsers: ['last 2 versions']
      browsers: ['last 2 versions', '> 2%', 'ie 8-11', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4']
    })
  ],

  plugins: plugins,

  module: {
    loaders: loaders
  },

  stats: { children: false }
};
