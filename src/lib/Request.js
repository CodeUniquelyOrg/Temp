import axios from 'axios';
import config from 'src/config';

// Obtained from config
// const CLIENT_ROOT_URL = config.server.portalRoot;   // 'http://localhost:4000;

// 'http://localhost:4000/api/v1';
const API_ROOT = config.server.apiRoot;

const getToken = () => {
  return localStorage.getItem('token');
};

// const setToken = (token) => {
//   localStorage.setItem('token', token);
// };

const format = (k,v) => v !== null ? `${k}=${encodeURIComponent(v)}` : '';

const toQueryString = (obj) => {
  return [].concat(...Object.entries(obj)
    .map(([k,v]) => Array.isArray(v)
      ? v.map(arr => toQueryString({ [k]:arr }))
      : format(k,v)))
    .filter(x => x)
    .join('&');
};

const serialize = (json) => {
  if (json) {
    return `?${toQueryString(json)}`;
  }
  return '';
};

// axios.get(`${API_ROOT}/users?minage=18&year=2017`, {
const makeApiRroute = ( url, params ) => {
  const trimmed = url ? url.trim() : undefined;
  if (trimmed) {
    if (trimmed.indexOf('/') === 0 ) {
      return `${API_ROOT}${trimmed}${serialize(params)}`;
    }
    return `${API_ROOT}/${trimmed}${serialize(params)}`;
  }
  return API_ROOT;
};

// Middleware error handler for API requests
const ErrorHandler = (dispatch, error, type) => {

  let errorMessage = '';
  console.log('ERROR IS ', error); // eslint-disable-line no-console

  if (error.response) {
    if(error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    } else if(error.response.data) {
      errorMessage = error.response.data;
    } else {
      errorMessage = error.response;
    }

    // =======================================================
    //   Need to look at the right part of ERROR for status
    // =======================================================
    // if(error.response.status === 401 || error.response.status === '401') {
    //   dispatch({
    //     type: type,
    //     payload: 'You are not authorized to do this. Please login and try again.'
    //   });
    // logoutUser();
    // }

  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    console.log(error.request); // eslint-disable-line no-console
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error.stack || error.message;
    // console.log('Error', error.stack || error.message); // eslint-disable-line no-console
  }

  // Dispatch an error message
  dispatch({
    type: type,
    payload: errorMessage
  });
};

// const getMockData = (url) => {
//   const response = require(`../../mock/${url}`);
//   return response;
// };

// test if user is accessing 'Protected' contents - (authenticated ONLY)
const Get = (url, params, callback) => {

  const requestUrl = makeApiRroute(url, params);
  // if (config.server.offline) {
  //   return callback(returnMockResponse(url));
  // }
  axios.get(requestUrl)
    // .then(callback)
    .then( response => {
      callback(null,response);
    })
    .catch( error => {
      callback(error);
      // errorHandler(dispatch, error, AUTH_ERROR);
    });
};

//
// ??? - WHAT ABOUT THIS ???
//
// const Get = (url, params, dispatch, callback) => {
//   const requestUrl = makeApiRroute(url, params);
//   // if (config.server.offline) {
//   //   return callback(returnMockResponse(url));
//   // }
//   return axios.get(requestUrl).$promise;
// };

const Post = (url, data, callback)  => {
  const requstUrl = makeApiRroute(url);
  axios.post(requstUrl,
    // headers: { 'Authorization': `Bearer ${token}` }, //  cookie.load('token') }
    data
  )
  // .then(callback)
    .then( response => {
      callback(null,response);
    })
    .catch( error => {
      callback(error);
      // errorHandler(dispatch, error, AUTH_ERROR);
    });
};

const Put = ( url, data, callback )  => {

  const requstUrl = makeApiRroute(url);

  axios.put(requstUrl,
    // headers: { 'Authorization': `Bearer ${token}` } //  cookie.load('token') }
    data
  )
    .then( response => {
      callback(null,response);
    })
    .catch((error) => {
      callback(error);
      // errorHandler(dispatch, error, AUTH_ERROR);
    });
};

const Delete = ( url, data, callback )  => {
  const requstUrl = makeApiRroute(url);
  // the 'redux-thunk' signature
  axios.delete(requstUrl,
    // headers: { 'Authorization': `Bearer ${token}` } //  cookie.load('token') }
    data
  )
    .then( response => {
      callback(null,response);
    })
  // .then(response => {
  //   dispatch({
  //     type: USER_DATA,
  //     payload: response.data, // .content  - expecting an ARRAY
  //   });
  // })
    .catch((error) => {
      callback(error);
      // errorHandler(dispatch, error, AUTH_ERROR);
    });
};

// ==============================================
//   Inject an INTERCEPTOR to handle Auth token
// ==============================================
axios.interceptors.request.use( config => {
  const token = getToken();
  if (token !== null) {
    // if (!config.headers) {
    //   config.headers = {};
    // }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, err => {
  return Promise.reject(err);
});

// axios.interceptors.response.use(response => {
//   if (response.data && response.data.token) {
//     localStorage.setItem('token', response.data.token);
//   }
//   return response;
// }, err => {
//   // Do something with response error
//   return Promise.reject(err);
// });

export { Get, Post, Delete, Put, ErrorHandler };
