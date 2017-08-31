module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.json?$/,
        loader: 'json-loader'
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
};
