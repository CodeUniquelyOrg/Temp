const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin  = require('compression-webpack-plugin');
const NofifierPlugin = require('webpack-build-notifier');
const WebpackOnBuildPlugin = require('on-build-webpack');

module.exports = ({ production = false } = {}) => {

  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };

  const plugins = [];

  // always used
  plugins.push( new webpack.EnvironmentPlugin(['NODE_ENV']) );
  plugins.push( new webpack.DefinePlugin(compileTimeConstantForMinification));

  // will need to optimize chunks if a browser is delivering them
  // if(browser) {
  plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfill'],
    })
  );
  // }

  // if (!browser) {
  //   plugins.push( new webpack.BannerPlugin(bannerOptions));
  // }

  if (production) {
    plugins.push(
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8,
      })
    );
  }

  // if (production) { // } && !browser) {
  //   plugins.push( new webpack.optimize.UglifyJsPlugin({ compress }) );
  // }
  if (!production) {
    plugins.push(
      new ExtractTextPlugin({
        filename: '[name].css',
        ignoreOrder: true,
        disable: false,
        allChunks: true,
      })
    );
  }

  if (production) { // && browser) {
    plugins.push(
      // new ExtractTextPlugin({
      //   filename: '[name].css',
      //   ignoreOrder: true,
      //   disable: false,
      //   allChunks: true,
      // })
      new ExtractTextPlugin({
        filename: '[contenthash].css',
        ignoreOrder: true,
        allChunks: true
      })
    );
    plugins.push(new webpack.optimize.UglifyJsPlugin({ compress }));
    plugins.push(new ManifestPlugin({ fileName: 'manifest.json' }));
  }

  if (!production) {
    plugins.push(
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
      })
    );

    plugins.push( new webpack.HotModuleReplacementPlugin() );
    plugins.push( new webpack.NoEmitOnErrorsPlugin() );
  }

  return plugins;
};
