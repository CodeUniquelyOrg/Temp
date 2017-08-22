import {
  HISTORY_DATA,
  HISTORY_ERROR,
} from 'actions/history';

// Build the redux 'initial state'
const INITIAL_STATE = {
  // error: '',
  // message: '',
  data: [],
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case HISTORY_DATA:
      return {  ...state, error: '', message: '', data: action.payload };
    case HISTORY_ERROR:
      return {  ...state, error: '', message: '' };
  }
  return state;
}
