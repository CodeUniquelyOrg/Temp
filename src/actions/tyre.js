// import axios from 'axios';
// import { browserHistory } from 'react-router';   // eslint-disable-line no-unused-vars

import {
  TYRE_DATA,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

// import config from 'src/config';

// Obtained from config
// const API_ROOT = config.server.apiRoot;   // 'http://localhost:4000/api/v1';

export const tyreData = () => {
  const regNum = 'L5 MNE';
  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    // Get(`/tyres/${regNum}`, null, (error,response) => {
    Get(`/tyres/${regNum}`, null, response => {

      if (error) {
        return ErrorHandler(dispatch, error, DATA_ERROR);
      }

      dispatch({
        type: TYRE_DATA,
        payload: response.data || [], // .content  - expecting an ARRAY
      });
    });
  };
};

// // Middleware error handler for API requests
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
//   // need to llok at the right part of ERROR for status
//   if(error.status === 401 || error.response && error.response.status === '401') {
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

/*
// axios.get(`${API_ROOT}/tyres/${regNum}`, {
//   headers: { 'Authorization': `Bearer ${token}` } //  cookie.load('token') }
// })
//   .then(response => {
//     dispatch({
//       type: TYRE_DATA,
//       payload: response.data, // .content  - expecting an ARRAY
//     });
//   })
//   .catch((error) => {
//     errorHandler(dispatch, error, AUTH_ERROR);
//   });
*/
