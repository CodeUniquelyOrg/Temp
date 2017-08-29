const path = require('path');

// ======================================================================
// __dirname is changed after webpack-ed to another directory
// so process.cwd() is used instead to determine the correct base directory
// Read more: https://nodejs.org/api/process.html#process_process_cwd
// ======================================================================
const CURRENT_WORKING_DIR = process.cwd();

module.exports = {
  // app: path.resolve(CURRENT_WORKING_DIR, 'app'),
  // assets: path.resolve(CURRENT_WORKING_DIR, 'public', 'assets'),
  // compiled: path.resolve(CURRENT_WORKING_DIR, 'compiled'),
  // public: '/assets/', // use absolute path for css-loader?
  // modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),

  // new ...
  root: path.resolve(CURRENT_WORKING_DIR),
  nodeModules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),
  modules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),

  build: path.resolve(CURRENT_WORKING_DIR, 'build'),
  public: path.resolve(CURRENT_WORKING_DIR, 'build', 'public'),

  assets: path.resolve(CURRENT_WORKING_DIR, 'assets'),
  img: path.resolve(CURRENT_WORKING_DIR, 'assets','img'),
  font: path.resolve(CURRENT_WORKING_DIR, 'assets', 'fonts'),

  // srcPath: path.resolve(CURRENT_WORKING_DIR, 'src'),
  app: path.resolve(CURRENT_WORKING_DIR, 'src'),
  action: path.resolve(CURRENT_WORKING_DIR, 'src', 'actions'),
  components: path.resolve(CURRENT_WORKING_DIR, 'src', 'components'),
  lib: path.resolve(CURRENT_WORKING_DIR, 'src', 'lib'),
  pages: path.resolve(CURRENT_WORKING_DIR, 'src', 'pages'),
  reducer: path.resolve(CURRENT_WORKING_DIR, 'src', 'reducers'),
  style: path.resolve(CURRENT_WORKING_DIR, 'src', 'style'),
  theme: path.resolve(CURRENT_WORKING_DIR, 'src', 'theme'),

  server: path.resolve(CURRENT_WORKING_DIR, 'server' ),
  mock: path.resolve(CURRENT_WORKING_DIR, 'server', 'mock' ),
};

