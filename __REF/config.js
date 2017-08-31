/* global module */
module.exports = {

  // Will be using REDUX for this
  options: {
    // storageToUse: 'session',  // 'session' or 'local'
    storageToUse: 'local',  // 'session' or 'local'
  },

  locale: 'en-GB',

  server: {
    offline: true,

    // portalRoot: 'http://localhost:5000',
    protocol: 'http',
    host: 'localhost',
    port: 5000,
    root: '',

    // apiRoot: 'http://192.168.16.86:8000/api/v1',
    apiProtocol: 'http',
    apiHost: 'localhost',
    apiPort: 8000,
    apiRoot: '/api/v1',
  },

  // mock: {
  // }

};
