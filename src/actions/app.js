//
// application - ACTIONS
//
import {
  TAB_SELECTED,
  VEHICLE_SELECTED,
  REGISTRATION_SELECTED,
  TYRE_SELECTED,
} from './types';

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
