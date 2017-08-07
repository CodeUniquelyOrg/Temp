module.exports = {
  // mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/mern-starter',
  mongoURL: 'mongodb://test:test@localhost/mern-starter',
  port: process.env.PORT || 8000,

  host: 'localhost',
  db: 'tracker',
  user: 'test',
  pass: 'test',
  traceDB: false,
  clean: false,
  // enableSSL: true,
  // sslValidate: false,
  // certificate: '<sslMongoDb.cer>',
  // replica: '<replset name>',

  server: {
    port: process.env.PORT || 8000,
    public: 'public',
    apiRoot: '/api/v1',
  },

  auth: {
    iis: 'Kids Run Free V2',
    apiExpire: 10 * 60,     // 10 minutes for the phone app
    expire: 24 * 60 * 60,   // 1 day for a browser
    secret: '6FakS4MZoToCrlYxR+dQxgUPBHOSS4R0cW0rwqzev77nWJzZn0nEssqJjKDuvlXj',
  },

  email: {
    host: 'smtp.kidsrunfree.co.uk',
    sender: 'postmaster@kidsrunfree.co.uk',
  },

  offline: true,

  reloadDb: false,

  mongo: {
    host: 'localhost',
    db: 'tracker',
    user: 'test',
    pass: 'test',
    traceDB: false,
    // enableSSL: true,
    // sslValidate: false,
    // certificate: '<sslMongoDb.cer>',
    // replica: '<replset name>',
  },
};
