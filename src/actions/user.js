//
// Handlers for user Data
//
import {
  USER_DATA,

  UPDATE_MOBILE,
  UPDATE_EMAIL,
  UPDATE_TITLE,
  UPDATE_GREETING,
  UPDATE_FORENAME,
  UPDATE_SURNAME,

  DATA_ERROR,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

export const getUserData = () => {
  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    // get 'MY' data from the server
    Get('/users/me', null, (error,response) => {
      if (error) {
        return ErrorHandler(dispatch, error, DATA_ERROR);
      }
      // contents - expecting an OBJECT
      dispatch({ type: USER_DATA, payload: response.data || {}, });
    });
  };
};