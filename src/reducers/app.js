import {
  TAB_SELECTED,
  VEHICLE_SELECTED,
  REGISTRATION_SELECTED,
  TYRE_SELECTED,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  selectedTab: '',
  selectedVehicle: '',
  selectedRegistration: '',
  selectedTyre: '',
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
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
