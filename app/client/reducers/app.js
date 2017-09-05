import {
  QR_CODE,
  SHARING_CODE,
  TAB_SELECTED,
  VEHICLE_SELECTED,
  REGISTRATION_SELECTED,
  TYRE_SELECTED,
} from 'constants/actionTypes';

// Build the redux 'initial state'
const INITIAL_STATE = {
  // code: 0,
  // sharingCode: '',
  selectedTab: 0,
  selectedVehicle: '',
  selectedRegistration: '',
  selectedTyre: '',
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case QR_CODE: {
      return { ...state, code: action.payload };
    }
    case SHARING_CODE: {
      return { ...state, sharingCode: action.payload };
    }
    case TAB_SELECTED: {
      return { ...state, selectedTab: action.payload };
    }
    case VEHICLE_SELECTED: {
      return { ...state, selectedVehicle: action.payload };
    }
    case REGISTRATION_SELECTED: {
      return { ...state, selectedRegistration: action.payload };
    }
    case TYRE_SELECTED: {
      return { ...state, selectedTyre: action.payload };
    }
  }
  return state;
}
