import {
  USER_DATA,
  USER_ERROR,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  // error: '',
  // message: '',
  data: {},
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_DATA: {
      return { ...state, data: action.payload };
      // return { ...state, action.payload };
    }
    case USER_ERROR: {
      return {  ...state, error: '', message: '' };
    }
  }
  return state;
}
