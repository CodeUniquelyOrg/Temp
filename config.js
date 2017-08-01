/* global module */
module.exports = {

  // Will be using REDUX for this
  options: {
    storageToUse: 'session',  // 'session' or 'local'
  },

  server: {
    port: 4000,
    apiRoot: 'http://localhost:8000/api/v1',
    portalRoot: 'http://localhost:4000',
  },

};
