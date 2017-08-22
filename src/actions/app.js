//
// application - ACTIONS
//
import {
  TAB_SELECTED,
  VEHICLE_SELECTED,
  REGISTRATION_SELECTED,
  TYRE_SELECTED,
} from './types';

export const selectTab = (tab) => {
  return (dispatch) => {
    dispatch({
      type: TAB_SELECTED,
      payload: tab
    });
  };
};

export const selectRegistration = (registration) => {
  return (dispatch) => {
    dispatch({
      type: REGISTRATION_SELECTED,
      payload: registration
    });
  };
};

export const selectVehicle = (identifier) => {
  return (dispatch) => {
    dispatch({
      type: VEHICLE_SELECTED,
      payload: identifier
    });
  };
};

export const selectTyre = (tyre) => {
  return (dispatch) => {
    dispatch({
      type: TYRE_SELECTED,
      payload: tyre
    });
  };
};
