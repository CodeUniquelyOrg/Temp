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

  static:    '/static/',

  // new ...
  root:       path.resolve(CURRENT_WORKING_DIR),
  modules:    path.resolve(CURRENT_WORKING_DIR, 'node_modules'),
  // nodeModules: path.resolve(CURRENT_WORKING_DIR, 'node_modules'),

  build:      path.resolve(CURRENT_WORKING_DIR, 'build'),
  public:     path.resolve(CURRENT_WORKING_DIR, 'build', 'public'),

  assets:     path.resolve(CURRENT_WORKING_DIR, 'src', 'assets'),
  img:        path.resolve(CURRENT_WORKING_DIR, 'src', 'assets','img'),
  font:       path.resolve(CURRENT_WORKING_DIR, 'src', 'assets', 'fonts'),

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

  src:        path.resolve(CURRENT_WORKING_DIR, 'src'),
  client:     path.resolve(CURRENT_WORKING_DIR, 'src', 'client'),
  server:     path.resolve(CURRENT_WORKING_DIR, 'src', 'server'),
  common:     path.resolve(CURRENT_WORKING_DIR, 'src', 'common'),
  mock:       path.resolve(CURRENT_WORKING_DIR, 'src', 'server', 'mock'),
};

