import axios from 'axios';
// import { browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars

import {
  USER_DATA,
} from './types';

import config from 'src/config';

// Obtained from config
const API_ROOT = config.server.apiRoot;   // 'http://localhost:4000/api/v1';

// Middleware error handler for API requests
export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  console.log('ERROR IS ', error); // eslint-disable-line no-console

  if (!error.response) {
    errorMessage = error.stack || error.message;
  } else {
    if(error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    } else if(error.response.data) {
      errorMessage = error.response.data;
    } else {
      errorMessage = error.response;
    }
  }

  // need to llok at the right part of ERROR for status
  if(error.status === 401 || error.response && error.response.status === '401') {
    dispatch({
      type: type,
      payload: 'You are not authorized to do this. Please login and try again.'
    });
    logoutUser();
  } else {
    dispatch({
      type: type,
      payload: errorMessage
    });
  }
}

// test if user is accessing 'Protected' contents - (authenticated ONLY)
export function protectedTest() {
  const token = localStorage.getItem('token');
  return (dispatch) => {
    axios.get(`${API_ROOT}/users`, {
      headers: { 'Authorization': `Bearer ${token}` } //  cookie.load('token') }
    })
      .then(response => {
        dispatch({
          type: USER_DATA,
          payload: response.data, // .content  - expecting an ARRAY
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error, AUTH_ERROR);
      });
  };
}