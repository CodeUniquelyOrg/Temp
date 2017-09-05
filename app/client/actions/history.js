//
// Registration History data from Server
//
import {
  HISTORY_DATA,
  HISTORY_ERROR,
} from 'constants/actionTypes';

import { ErrorHandler, Get } from 'services/Request';

// export const getHistoryData = (registration, fromDate) => {
export const getHistoryData = vin => dispatch => {
  Get('/history/me', null, dispatch, HISTORY_DATA, HISTORY_ERROR);
};
