const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const NofifierPlugin = require('webpack-build-notifier');

module.exports = ({ production = false, browser = false } = {}) => {
  const bannerOptions = { raw: true, banner: 'require("source-map-support").install();' };
  const compress = { warnings: false };
  const compileTimeConstantForMinification = { __PRODUCTION__: JSON.stringify(production) };

  if (!production && !browser) {
    return [
      new NofifierPlugin({
        title: 'Contact Forms',
        suppressSuccess: true,        // only first success is shown, after a fail
        // suppressWarnings: true,    // show warnings too
        sound: true,                  // I want some sounds
        successSound: 'Morse',        // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
        warningSound: 'Tink',         // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
        failureSound: 'Basso',        // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
        logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
        activateTerminalWindow: true, // Take me to terminal on errors
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions)
    ];
  }
  if (!production && browser) {
    return [
      new NofifierPlugin({
        title: 'Contact Forms',
        suppressSuccess: true,        // only first success is shown, after a fail
        // suppressWarnings: true,    // show warnings too
        sound: true,                  // I want some sounds
        successSound: 'Morse',        // Mac OSX  | Basso, Blow, Bottle, Frog, Funk |
        warningSound: 'Tink',         // Mac OSX  | Glass, Hero, Morse, Ping, Pop   |
        failureSound: 'Basso',        // Mac OSX  | Purr, Sosumi, Submarine, Tink   |
        logo: 'https://s.gravatar.com/avatar/5658520ca57bc79b1e14823e078d1d80?s=80',
        activateTerminalWindow: true, // Take me to terminal on errors
      }),
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ];
  }
  if (production && !browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new webpack.BannerPlugin(bannerOptions),
      new webpack.optimize.UglifyJsPlugin({ compress })
    ];
  }
  if (production && browser) {
    return [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new webpack.DefinePlugin(compileTimeConstantForMinification),
      new ExtractTextPlugin({
        filename: '[contenthash].css',
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({ compress }),
      new ManifestPlugin({
        fileName: 'manifest.json'
      })
    ];
  }
  return [];
};
