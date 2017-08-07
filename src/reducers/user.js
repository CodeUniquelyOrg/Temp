import {
  PROTECTED_TEST,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  error: '',
  message: '',
  user: {},
};

export default function (state = INITIAL_STATE, action) {
  switch(action.type) {
    case PROTECTED_TEST:
      return { ...state, error: '', message: '', users: action.payload };
  }
  return state;
}
