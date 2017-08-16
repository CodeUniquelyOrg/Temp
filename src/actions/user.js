//
// Handlers for user Data
//
import {
  USER_DATA,
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