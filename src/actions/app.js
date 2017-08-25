//
// application - ACTIONS
//
import {
  QR_CODE,
  SHARING_CODE,
  TAB_SELECTED,
  VEHICLE_SELECTED,
  REGISTRATION_SELECTED,
  TYRE_SELECTED,
} from './types';

import config from 'src/config';

const CLIENT_ROOT_URL = process.env.CLIENT_ROOT || `${config.server.protocol}://${config.server.host}:${config.server.port}${config.server.root}`;

// request library
import { Post } from 'src/lib/Request';

export const setCode = (code) => dispatch => {
  // Post('/vehicle/code', { code: code }, dispatch, QR_CODE, QR_CODE);  // A HACK - I KNOW !!!
  Post('/vehicle/code', { code:code }, (err,response) => {

    if (err) {
      // if (err.response && err.response.status === 401) {
      //   logoutUser();
      // }
      return ErrorHandler(dispatch, err, QR_CODE);   // *** NOT WHAT IS REQUIRED AT ALL ***
    }

    // Need to make the rquest for user (passing ID)
    // and store the answer in state ?????
    // dispatch({ type: AUTH_USER });

    // I COMPLETELY DISLIKE THIS HACK --- REALLY REALLY REALLY
    window.location.href = CLIENT_ROOT_URL + '/dashboard';
  });
};

export const setSharingCode = code => dispatch => {
  dispatch({
    type: SHARING_CODE,
    payload: code
  });
};

export const selectTab = tab => dispatch => {
  dispatch({
    type: TAB_SELECTED,
    payload: tab
  });
};

export const selectRegistration = registration => dispatch => {
  dispatch({
    type: REGISTRATION_SELECTED,
    payload: registration
  });
};

export const selectVehicle = identifier => dispatch => {
  dispatch({
    type: VEHICLE_SELECTED,
    payload: identifier
  });
};

export const selectTyre = tyre => dispatch => {
  dispatch({
    type: TYRE_SELECTED,
    payload: tyre
  });
};
