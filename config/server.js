import { ENV } from './env';

export const auth = {
  secret: '6Fakv2Crlg85Vm7y4!!524782C66+5|8:2-t72j=H^867|v%6^4*Cn9V99c8R',
  expire: 24 * 60 * 60,   // 1 Day
  apiExpire: 5 * 60,      // 5 minutes
};

// export const DB_TYPE = process.env.DB_TYPE || 'mongo';
// export const COMPOSED = process.env.COMPOSED || false;

export const db = {
  host: ENV.DOCKER ? 'mongo' : 'localhost',
  traceDB: ENV.DB_TRACE,
  db: 'portal',
  // user: 'test',
  // pass: 'test',
  // enableSSL: true,
  // sslValidate: false,
  // certificate: '<sslMongoDb.cer>',
  // replica: '<replset name>',
};