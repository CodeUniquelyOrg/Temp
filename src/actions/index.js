import axios from 'axios';
import { browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars
import cookie from 'react-cookie';

import { AUTH_USER,
         AUTH_ERROR,
         UNAUTH_USER,
         PROTECTED_TEST } from './types';

import config from 'src/config';

// Obtained from config
const CLIENT_ROOT_URL = config.portalRoot;    // 'http://localhost:4000;
const API_ROOT = config.apiRoot;               // 'http://localhost:4000/api/v1';

// Middleware error handler for API requests
export function errorHandler(dispatch, error, type) {
  let errorMessage = '';

  if(error.data.error) {
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
    axios.post(`${API_ROOT}/auth/login`, {
      email, password
    })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

// Post to APP URL -  /{api-root}/auth/register
export function registerUser({ email, firstName, lastName, password }) {
  return function(dispatch) {
    axios.post(`${API_ROOT}/auth/register`, {
      email, firstName, lastName, password
    })
    .then(response => {
      cookie.save('token', response.data.token, { path: '/' });
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
    dispatch({ type: UNAUTH_USER });
    cookie.remove('token', { path: '/' });

    window.location.href = CLIENT_ROOT_URL + '/login';
  };
}

// test if user is accessing 'Protected' contents - (authenticated ONLY)
export function protectedTest() {
  return function(dispatch) {
    axios.get(`${API_ROOT}/protected`, {
      headers: { 'Authorization': cookie.load('token') }
    })
    .then(response => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}