//
// get Tyre Data for {registration} from Server
//
import {
  TYRE_DATA,
  DATA_ERROR,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

export const tyreData = (regNum) => {
  // =======================
  // 'redux-thunk' signature
  // =======================
  return (dispatch) => {
    Get(`/tyres/${regNum}`, null, (error,response) => {

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
