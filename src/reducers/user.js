import {
  USER_DATA,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  // error: '',
  // message: '',
  user: {},
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case USER_DATA: {
      return { ...state, user: action.payload };
    }
  }
  return state;
}
