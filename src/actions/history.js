//
// Registration History data from Server
//
import {
  HISTORY_DATA,
  HISTORY_ERROR,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

// export const getHistoryData = (registration, fromDate) => {
export const getHistoryData = vin => dispatch => {

  Get(`/history/${vin}`, null, (error,response) => {
    if (error) {
      // throw error; // ????
      return ErrorHandler(dispatch, error, HISTORY_ERROR);
    }

    // dispatch(loadHistorySuccess(response.data));
    dispatch({
      type: HISTORY_DATA,
      payload: response.data || [], // .content  - expecting an ARRAY
    });
  });
};
