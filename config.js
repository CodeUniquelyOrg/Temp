/* global module */
module.exports = {

  // Will be using REDUX for this
  options: {
    storageToUse: 'session',  // 'session' or 'local'
  },

  locale: 'en-GB',

  server: {
    offline: true,

    port: 5000,
    portalRoot: 'http://localhost:5000',
    apiRoot: 'http://localhost:8000/api/v1',

    // portalRoot: 'http://192.168.1.126:5000',
    // apiRoot: 'http://192.168.1.126:8000/api/v1',
  },

  // mock: {
  // }

};
