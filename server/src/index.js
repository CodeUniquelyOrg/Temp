// ===============================================================
// Written by steve saxton <steves@codeuniquely.co.uk>
// Main webpack import for API Server Project
// Version 1.0.0 July 2017
// ===============================================================
const config = require('./config.js');

// load the assets needed for PDF generation
// import 'asset/index';    // will load index.js

console.log('HAVE STARTED'); // eslint-disable-line no-console
console.log('PORT IS ', config.port); // eslint-disable-line no-console

console.log('EXITING NOW ...'); // eslint-disable-line no-console
process.exit(0);

// ==========================
// REAL
// ==========================
// // load the server code
// import apiServer from 'src/server.js';

// apiServer(PORT, () => {
//   console.log('running...');  // eslint-disable-line no-console
// });
