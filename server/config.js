module.exports = {

  version: '0.0.1',

  locales: {
    supported: ['de-DE', 'de', 'en-GB'],
    default: 'en=-GB',
  },

  server: {
    // port: process.env.PORT || 80,
    port: process.env.PORT || 8000,
    apiRoot: '/api/v1',
  },

  auth: {
    secret: '6Fakv2Crlg85Vm7y4!!524782C66+5|8:2-t72j=H^867|v%6^4*Cn9V99c8R',
    expire: 24 * 60 * 60,   // 1 Day
    apiExpire: 5 * 60,      // 5 minutes
  },

  mongo: {
    host: 'localhost',
    // host: 'mongo',   // - docker-compose version
    db: 'portal',
    // user: 'test',
    // pass: 'test',
    traceDB: true,
    // enableSSL: true,
    // sslValidate: false,
    // certificate: '<sslMongoDb.cer>',
    // replica: '<replset name>',
  },
};
