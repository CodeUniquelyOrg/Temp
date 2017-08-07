//
//
//
import {
  AUTH_USER,
  UNAUTH_USER,
} from './types';

import config from 'src/config';

// Obtained from config
const CLIENT_ROOT_URL = config.server.portalRoot;    // 'http://localhost:4000;

import { ErrorHandler, Post } from 'src/lib/Request';

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

// function call o logout  user - > redirect to login (or) / root ???
export function logoutUser() {
  return function (dispatch) {
    localStorage.removeItem('token');
    dispatch({ type: UNAUTH_USER });
    window.location.href = CLIENT_ROOT_URL + '/';
  };
}
