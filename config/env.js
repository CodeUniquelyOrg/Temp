// ===================================================
// Define a number of ENV variables that will be used
// ===================================================

// running in 'development' mode by default
export const ENV = process.env.NODE_ENV || 'development';

// application / server start up port
export const PORT = process.env.PORT || 5000;

// running in docker-compose 'container'
export const DOCKER = process.env.DOCKER || false;

// trace MONGO-DB data access / function calls
export const DB_TRACE = process.env.DB_TRACE || false;

// Google analytics activated
export const GOOGLE_ANALYTICS_ID = process.env.GOOGLE_ANALYTICS_ID || null;

// is the application going to be running offline ?
export const OFFLINE = process.env.OFFLINE || true;

// use devices 'local storage' for JWT / tokens
export const STORAGE = process.env.STORAGE || 'local';
