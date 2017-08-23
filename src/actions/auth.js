//
//
//
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from './types';

import config from 'src/config';

// Tokens API
import { removeToken } from 'lib/Tokens';   // ALIAS !!!!

// Obtained from config - for example 'http://localhost:4000;
const CLIENT_ROOT_URL = process.env.CLIENT_ROOT || `${config.server.protocol}://${config.server.host}:${config.server.port}${config.server.root}`;

import { ErrorHandler, Post } from 'src/lib/Request';

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

      // Need to make the rquest for user (passing ID)
      // and store the answer in state ?????
      dispatch({ type: AUTH_USER });

      // I COMPLETELY DISLIKE THIS HACK --- IMMENSLY
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
      // tokens.setToken(response.data.token);
      dispatch({ type: AUTH_USER });
      window.location.href = CLIENT_ROOT_URL + '/dashboard';
    });
  };
};

// function call o logout  user - > redirect to login (or) / root ???
export const logoutUser = () => {
  return function (dispatch) {
    removeToken();
    dispatch({ type: UNAUTH_USER });
    window.location.href = CLIENT_ROOT_URL + '/';
  };
};
