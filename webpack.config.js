var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const cssModuleIdentTemplate = '[name]__[local]___[hash:base64:5]';

const plugins = [

  new ExtractTextPlugin({
    filename: '[name].css',
    ignoreOrder: true,
    disable: false,
    allChunks: true,
  }),

  // new webpack.optimize.CommonsChunkPlugin({
  //   name: ['app', 'vendor', 'polyfill'],
  // }),

];

module.exports = {
  devtool: 'inline-source-map',
  entry: ['./app/index.js'],
  output: {
    path: path.join(__dirname, 'build/assets'),
    filename: 'bundle.js'
  },

  plugins: plugins,

  resolve: {
    // alias:{
    //   root: rootPath,
    //   node: nodeModulesPath,
    //   assets: assetsPath,
    //   img: imgPath,
    //   font: fontPath,
    //   src: srcPath,
    //   actions: actionPath,
    //   components: componentsPath,
    //   lib: libPath,
    //   pages: pagesPath,
    //   reducers: reducerPath,
    //   style: stylePath,
    //   theme: themePath,
    // },
    extensions: ['.js', '.css', '.json', '.html' ],
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss-loader',
      }, {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },

      // {
      //   test: /.js$/,
      //   loader: 'babel-loader',
      //   include: path.join(__dirname, 'app'),
      //   exclude: /node_modules/,
      //   query: {
      //     presets: ['es2015', 'react', 'stage-0']
      //   }
      // },

      // {
      //   test: /\.css$/,
      //   include: [
      //     path.join(__dirname, 'app'),
      //   ],
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         // options: { importLoaders: 1 },
      //         // query: {
      //         query: {
      //           modules: true,
      //           sourceMap: false,  // true
      //           // importLoaders: 1,
      //           localIdentName: cssModuleIdentTemplate, // '[name]__[local]___[hash:base64:5]',
      //         },
      //       },
      //       {
      //         loader: 'postcss-loader',
      //         options: {
      //           plugins: [
      //             require('postcss-import')({
      //               root: path.join(__dirname, 'app'),
      //             }),
      //             require('postcss-cssnext')({
      //               browsers: ['last 2 versions', '> 2%', 'ie > 10', 'firefox > 40', 'safari > 5', 'opera > 30', 'ios 6-7', 'android 4'],
      //             }),
      //             require('postcss-nested'),
      //             require('postcss-modules-values'),
      //           ],
      //         },
      //       },
      //     ],
      //   }),
      // },

      {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader?limit=10000',
      },

      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ]
  },
};
