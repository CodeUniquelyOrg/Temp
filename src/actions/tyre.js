//
// get Tyre Data for {registration} from Server
//
import {
  TYRE_DATA,
  HISTORY_DATA,
  DATA_ERROR,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

export const tyreData = (regNum) => {

  // get a condensded plate before you send it
  const condensed = regNum.replace(/\s/g, '');

  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    Get(`/tyres/${condensed}`, null, (error,response) => {

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

export const getHistoryData = (regNum) => {

  // get a condensded plate before you send it
  const condensed = regNum.replace(/\s/g, '');

  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {

    Get(`/history/${condensed}`, null, (error,response) => {

      if (error) {
        return ErrorHandler(dispatch, error, DATA_ERROR);
      }

      dispatch({
        type: HISTORY_DATA,
        payload: response.data || [], // .content  - expecting an ARRAY
      });
    });
  };
};
