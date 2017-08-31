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
  // Get(`/history/${vin}`, null, dispatch, HISTORY_DATA, HISTORY_ERROR);
  Get('/history/me', null, dispatch, HISTORY_DATA, HISTORY_ERROR);
};
