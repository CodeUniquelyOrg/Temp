import {
  TYRE_DATA,
  HISTORY_DATA,
  DATA_ERROR,
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
    case HISTORY_DATA:
      return {  ...state, error: '', message: '', history: action.payload };
    case DATA_ERROR:
      return {  ...state, error: '', message: '' };
  }
  return state;
}
