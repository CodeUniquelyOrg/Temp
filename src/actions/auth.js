// import axios from 'axios';
// import { browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars

import {
  AUTH_USER,
  USER_DATA,
  UNAUTH_USER,
} from './types';

import config from 'src/config';

// Obtained from config
const CLIENT_ROOT_URL = config.server.portalRoot;    // 'http://localhost:4000;
// const API_ROOT = config.server.apiRoot;               // 'http://localhost:4000/api/v1';

import { ErrorHandler, Post } from 'src/lib/Request';

// Middleware error handler for API requests
// export function errorHandler(dispatch, error, type) {
//   let errorMessage = '';
//
//   console.log('ERROR IS ', error); // eslint-disable-line no-console
//
//   if (!error.response) {
//     errorMessage = error.stack || error.message;
//   } else {
//     if(error.response.data && error.response.data.error) {
//       errorMessage = error.response.data.error;
//     } else if(error.response.data) {
//       errorMessage = error.response.data;
//     } else {
//       errorMessage = error.response;
//     }
//   }
//
//   if(error.status === 401) {
//     dispatch({
//       type: type,
//       payload: 'You are not authorized to do this. Please login and try again.'
//     });
//     logoutUser();
//   } else {
//     dispatch({
//       type: type,
//       payload: errorMessage
//     });
//   }
// }

// if (config.server.offline) {
//   // localStorage.setItem('token', response.data.token);
//   dispatch({ type: AUTH_USER });
//   window.location.href = CLIENT_ROOT_URL + '/dashboard';
//   return;
// }

export const loginUser = ({ email, password }) => {
  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    const lowerEmail = email.toLowerCase();

    Post('/auth/login', { email:lowerEmail, password }, (err,response) => {

      if (err) {
        // if (err.response && err.response.status === 401) {
        //   logoutUser();
        // }

        return ErrorHandler(dispatch, err, AUTH_ERROR);
      }

      // otherwise => set as 'Authenticated'

      localStorage.setItem('token', response.data.token);

      // Need to make the rquest for user (passing ID)
      // and store the answer in state ?????
      dispatch({ type: USER_DATA });
      dispatch({ type: AUTH_USER });

      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    });

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

  };
};
// // Post to APP URL -  /{api-root}/auth/login
// export function loginUser({ email, password }) {
//   return function(dispatch) {
//     const lowerEmail = email.toLowerCase();
//     axios.post(`${API_ROOT}/auth/login`, { email:lowerEmail, password })
//       .then(response => {
//         localStorage.setItem('token', response.data.token);
//         dispatch({ type: AUTH_USER });
//         window.location.href = CLIENT_ROOT_URL + '/dashboard';
//       })
//       .catch((error) => {
//         errorHandler(dispatch, error, AUTH_ERROR);
//       });
//   };
// }

export const registerUser = ({ email, firstName, lastName, password  }) => {
  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    const lowerEmail = email.toLowerCase();
    Post( '/auth/register', { email:lowerEmail, firstName, lastName, password }, dispatch, response => {
      localStorage.setItem('token', response.data.token);
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    });
  };
};
// Post to APP URL -  /{api-root}/auth/register
// export function registerUser({ email, firstName, lastName, password }) {
//   return function(dispatch) {
//     axios.post(`${API_ROOT}/auth/register`, { email, firstName, lastName, password })
//       .then(response => {
//         localStorage.setItem('token', response.data.token);
//         dispatch({ type: AUTH_USER });
//         window.location.href = CLIENT_ROOT_URL + '/dashboard';
//       })
//       .catch((error) => {
//         errorHandler(dispatch, error, AUTH_ERROR);
//       });
//   };
// }

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
