module.exports = function support(injectables){

  const config = injectables.config;
  const agent = injectables.agent;
  const path = injectables.path;
  const fs = injectables.fs;

  // key used to securewebApi requests
  const apiKey = config.auth.secret;

  // function asyncDataRequest( data, callback ){
  //   setTimeout(function() {
  //     callback(data);
  //   }, timeTaken);+
  // }

  // function asyncGetHistory(vin, fromDate, toDate, callback){
  //   setTimeout(function() {
  //     const list = mockdata.map( node => {
  //       const date = new Date(node.magsensorhighdttm);
  //       if (vin == node.vehicleIdentifier && date >= fromDate && date <= toDate) {
  //         return node;
  //       }
  //     }).filter(x => x);
  //     callback(null,list);
  //   }, timeTaken);
  // }

  // ASYNC - Dynamically load the JSON response from a file on disk
  // const mockdata = require('../mock/history.json');
  const loadMockData = (url, params, callback) => {
    const name = url.replace(/\//g, '-');
    const file = path.resolve(`${config.mocks.path}/${name}.json`);
    // open the file as 'utf-8'
    fs.readFile(file, 'utf8', (err, contents) => {
      if (err) {
        return callback(err);
      }
      try {
        const json = JSON.parse(contents);
        callback(null,json);
      } catch(e) {
        callback(e);
      }
    });
  };

  // ASYNC - SECURELY request the data from WebApi
  const makeRequest = (url, params, callback) => {
    agent('GET', url)
      .auth(apiKey, '')
      .accept('application/json')
      .query(params)
      .end(callback);
  };

  // All requests for data go via this function from now on
  const getRequest = (path, params, callback) => {
    if ( config.webapi.offline ) {
      loadMockData(path, params, callback);
    } else {
      // SuperAgent( ... );
      // build the request URL
      const url = `${config.webapi.apiRoot}/path`;
      agent('GET', url)
        .auth(apiKey, '')
        .accept('application/json')
        .query(params)
        .end(callback);
    }
  };

  return {
    get: getRequest,
  };
};
