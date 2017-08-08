/* globals __dirname, module, require, process */
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin  = require('compression-webpack-plugin');
var NofifierPlugin = require('webpack-build-notifier');
// var autoprefixer = require('autoprefixer');
var path = require('path');

var config = require('./config.js');

// Define the environment
var env = 'development';

// used by CSS modules
// var cssModuleIdentTemplate = '[name]__[local]___[hash:base64:5]';
var cssModuleIdentTemplate = '[name]--[local]--[hash:base64:8]';

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
var stylePath         = path.resolve( srcPath, 'style' );
var pagesPath         = path.resolve( srcPath, 'pages' );
var componentsPath    = path.resolve( srcPath, 'components' );
var actionPath        = path.resolve( srcPath, 'actions' );
var reducerPath       = path.resolve( srcPath, 'reducers' );
// var mockPath          = path.resolve( srcPath, 'mock' );

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

  // new webpack.optimize.OccurenceOrderPlugin(),

  // https://github.com/webpack/docs/wiki/optimization#deduplication
  // new webpack.optimize.DedupePlugin(),

  new HtmlWebpackPlugin({
    inject: true,
    title: 'Portal',
    template: path.resolve(assetsPath, 'index.html')
  }),

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

  // Build GZIP versions of the 'files', usually served by web server
  new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),

  // new ExtractTextPlugin('bundle.[hash].css', {
  //   allChunks: true
  // }),
  new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true,
  }),

  // optimization plugins
  // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].bundle.js'),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['app', 'vendor', 'polyfill'],
  }),

  // copy HACKS for 'crappy' IE Browsers
  // import 'assets/js/json3.min.js';
  // import 'assets/js/eventsource.min.js';
  new CopyWebpackPlugin([
    { from: path.resolve(assetsPath, 'js'), to: 'js' },
  ]),

  // new webpack.HotModuleReplacementPlugin(),

  new webpack.NoEmitOnErrorsPlugin(),
];

// ==============================
//  Pre-loaders
// ==============================
// var preLoaders = [
//   {
//     test: /\.js$/,
//     loaders: ['eslint'],
//     exclude: [nodeModulesPath],
//   },
// ];

// ==============================
//  Loader Rules
// ==============================
var rules = [
  {
    test: /\.js$/,
    enforce: 'pre',
    loaders: ['eslint-loader'],
    exclude: [nodeModulesPath],
  },
  {
    test: /\.js$/,
    include: [
      srcPath
    ],
    use: [{
      loader: 'babel-loader',
      // options: { presets: ['es2015', 'stage-0', 'react'] },
    }],
  },

  {
    test: /\.jsx$/,
    include: [
      srcPath
    ],
    use: [{
      loader: 'babel-loader',
      // options: { presets: ['es2015', 'stage-0', 'react'] },
    }],
  },

  // {
  //   test: /\.js$/i,
  //   loader: 'babel-loader',
  //   include: [
  //     path.resolve(__dirname, 'src'),
  //   ],
  // },

  {
    test: /\.html$/i,
    exclude: [/node_modules/],
    loader: 'html-loader'
    // loader: 'raw-loader!htmlclean-loader'
  },
  {
    test: /\.ico($|\?)/i,
    loader: 'file-loader',
    query:{ name:'[path][name].[ext]', context:assetsPath }
  },

  // {
  //   test: /\.(jpe?g|gif|png|svg)($|\?)/i,
  //   loader: 'file-loader',
  //   include: [
  //     srcPath,
  //   ],
  //   query: {
  //     name: 'resources/[hash].[ext]',
  //   },
  // },
  {
    test: /\.jpe?g($|\?)|\.gif($|\?)|\.png($|\?)/i,
    loader: 'file-loader',
    query: {
      name: 'img/[name].[ext]',
      context: assetsPath
    },
  },

  {
    test: /webfont\.(eot|ttf|woff|woff2|svg)($|\?)/i,
    exclude: [/node_modules/],
    loader: 'file-loader',
    query: {
      name: '[path][name].[ext]',
      context:assetsPath
      // name: 'fonts/[name].[ext]',
    },
  },
  // {
  //   test: /\.svg($|\?)|\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)/i,
  //   loader: 'file-loader',
  //   query:{
  //     name:'[path][name].[ext]',
  //     context:assetsPath
  //   }
  // },

  {
    test: /\.css$/,
    // include: [
    //   path.join(nodeModulesPath, 'quill'),
    // ],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    })
  },

  // {
  //   test: /\.less$/i,
  //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader')
  // },
  // {
  //   test: /.*\.less$/,
  //   loader: ExtractTextPlugin.extract({
  //     use:[ 'css-loader', 'less-loader' ],
  //     fallback: 'style-loader'
  //   })
  // },

  // {
  //   test: /\.scss$/i,
  //   loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
  // },
  // {
  //   test: /\.sass$/,
  //   loader: ExtractTextPlugin.extract({
  //     fallback: 'style-loader',
  //     use: [ 'css-loader', 'sass-loader'],
  //   }),
  // },
  // {
  //   test: /\.scss$/,
  //   // include: [
  //   //   path.join(nodeModulesPath, 'quill'),
  //   //   path.join(nodeModulesPath, 'bootstrap/dist'),
  //   // ],
  //   use: ExtractTextPlugin.extract({
  //     fallback: 'style-loader',
  //     use: 'sass-loader',
  //   })
  // },

  {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      // Could also be writen as follow:
      // use: 'css-loader?modules&importLoader=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader'
      use: [
        {
          loader: 'css-loader',
          // query: {
          options: {
            modules: true,
            sourceMap: true,
            // importLoaders: 2,
            localIdentName: cssModuleIdentTemplate, // '[name]__[local]___[hash:base64:5]'
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-import')({
                root: srcPath,
              }),
              require('postcss-cssnext')({
                browsers: ['last 4 versions', '> 2%', 'ie > 10', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4'],
                // features: {
                //   customProperties: {
                //     variables: reactToolboxVariables(),
                //   },
                // },
              }),
              require('postcss-nested'),
              require('postcss-modules-values'),
            ],
          },
        },
        {
          loader: 'sass-loader'
        },
      ]
    }),
  },

  {
    test: /\.css|.pcss$/,
    include: [
      srcPath,
      // path.join(nodeModulesPath, 'react-toolbox/lib'),
    ],
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          // options: { importLoaders: 1 },
          // query: {
          options: {
            modules: true,
            sourceMap: true,
            // importLoaders: 1,
            localIdentName: cssModuleIdentTemplate, // '[name]__[local]___[hash:base64:5]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: [
              require('postcss-import')({
                root: srcPath,
              }),
              require('postcss-cssnext')({
                browsers: ['last 2 versions', '> 2%', 'ie > 10', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4'],
                // features: {
                //   customProperties: {
                //     variables: reactToolboxVariables(),
                //   },
                // },
              }),
              require('postcss-nested'),
              require('postcss-modules-values'),
            ],
          },
        },
      ],
    }),
  },

  {
    test: /\.json$/i,
    loader: 'json-loader',
  },
];

module.exports = {

  // port: PORT,
  // 'eval', 'source-map', hidden-source-map, inline-source-map, eval-source-map, cheap-source-map
  devtool: 'eval',

  entry: {
    app: [
      'babel-polyfill',
      // 'webpack/hot/dev-server',
      // 'webpack-hot-middleware/client?overlay=false',
      path.resolve(srcPath, 'index.js'),
    ],
    vendor: [
      'core-js',
      'react',
      'react-dom',
      'react-proptypes',
      'react-router',
    ],
    polyfill: [
      'eventsource-polyfill',
    ],
  },

  // entry: {
  //   app: [
  //     path.resolve(clientSrcPath, 'index.js'),
  //     // blah blah blah
  //   ],
  //   vendor: [
  //     'react',
  //     'react-dom',
  //     'prop-types',
  //     'react-router',
  //     // blah blah blah
  //   ],
  //   polyfill: [
  //     'eventsource-polyfill',
  //     // blah blah blah
  //   ],
  // },

  resolve: {
    alias:{
      root: rootPath,
      node: nodeModulesPath,
      assets: assetsPath,
      img: imgPath,
      font: fontPath,
      src: srcPath,
      pages: pagesPath,
      components: componentsPath,
      actions: actionPath,
      reducers: reducerPath,
      style: stylePath,
    },
    extensions: ['.js', '.pcss', '.scss', '.json', '.html' ],
    // modules: [
    //   'client',
    //   'node_modules',
    // ],
  },

  // output: {
  //   chunkFilename: '[id].chunk.js',
  //   filename: '[name].js',
  //   path: publicPath,
  //   // publicPath: 'http://0.0.0.0:8000/',
  //   // publicPath: publicPath,
  //   publicPath: '/',
  // },
  output: {
    chunkFilename: '[id].chunk.js',
    path: buildPath,
    filename: '[name].[hash].js',
    publicPath: '/',
  },

  // postcss: [
  //   autoprefixer({
  //     browsers: ['last 4 versions', '> 2%', 'ie > 10', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4']
  //   }),
  // ],

  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    port: PORT,
    hot: true
  },

  plugins: plugins,

  module: {
    rules: rules,
  },
};
