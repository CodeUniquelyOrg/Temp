import axios from 'axios';
import { browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars

import {
  AUTH_USER,
  AUTH_ERROR,
  UNAUTH_USER,
  PROTECTED_TEST
} from './types';

import config from 'src/config';

// Obtained from config
const CLIENT_ROOT_URL = config.server.portalRoot;    // 'http://localhost:4000;
const API_ROOT = config.server.apiRoot;               // 'http://localhost:4000/api/v1';

// Middleware error handler for API requests
export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  console.log('ERROR IS ', error); // eslint-disable-line no-console

  if(error.data && error.data.error) {
    errorMessage = error.data.error;
  } else if(error.data) {
    errorMessage = error.data;
  } else {
    errorMessage = error;
  }

  if(error.status === 401) {
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

//  Post to APP URL -  /{api-root}/auth/login
export function loginUser({ email, password }) {
  return function(dispatch) {
    const lowerEmail = email.toLowerCase();
    axios.post(`${API_ROOT}/auth/login`, { email:lowerEmail, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response || error.message, AUTH_ERROR);
      });
  };
}

// Post to APP URL -  /{api-root}/auth/register
export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_ROOT}/auth/register`, { email, firstName, lastName, password })
      .then(response => {
        localStorage.setItem('token', response.data.token);
        dispatch({ type: AUTH_USER });
        window.location.href = CLIENT_ROOT_URL + '/dashboard';
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}

// function call o logout  user - > redirect to login (or) / root ???
export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: UNAUTH_USER });
    window.location.href = CLIENT_ROOT_URL + '/';

    // const token = localStorage.getItem('token');
    // if (!token) {
    //   dispatch({
    //     type: UNAUTH_USER
    //   });
    //   window.location.href = CLIENT_ROOT_URL + '/';
    // } else {
    //   axios.get(`${API_ROOT}/auth/logout`, {
    //     headers: { 'Authorization': `Bearer ${token}` }
    //   }).then(() => {
    // }).catch((error) => {
    // }).then(() => {
    //   // always executed
    //   dispatch({
    //     type: UNAUTH_USER
    //   });
    //   localStorage.removeItem('token');
    //   window.location.href = CLIENT_ROOT_URL + '/';
    // });
    // }
  };
}

// test if user is accessing 'Protected' contents - (authenticated ONLY)
export function protectedTest() {
  const token = localStorage.getItem('token');
  return function(dispatch) {
    axios.get(`${API_ROOT}/users`, {
      headers: { 'Authorization': `Bearer ${token}` } //  cookie.load('token') }
    })
      .then(response => {
        dispatch({
          type: PROTECTED_TEST,
          payload: response.data, // .content  - expecting an ARRAY
        });
      })
      .catch((error) => {
        errorHandler(dispatch, error.response, AUTH_ERROR);
      });
  };
}