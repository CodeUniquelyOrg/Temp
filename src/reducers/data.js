import {
  TYRE_DATA,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  error: '',
  message: '',
  tyres: [],
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case TYRE_DATA:
      return {  ...state, error: '', message: '', tyres: action.payload };
  }
  return state;
}
