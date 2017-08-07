import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
} from 'actions/types';

// Build the redux 'initial state'
const INITIAL_STATE = {
  error: '',
  message: '',
  authenticated: false
};

export default function (state = INITIAL_STATE, action) {
  // let newState;

  switch(action.type) {
    case AUTH_USER:
      console.log('WE HAVE AUTHENTCATED THE SESSION'); // eslint-disable-line no-console
      // console.log('STATE'); // eslint-disable-line no-console
      // console.log(state); // eslint-disable-line no-console
      // newState = { ...state, error: '', message: '', authenticated: true };
      // console.log(newState); // eslint-disable-line no-console
      return { ...state, error: '', message: '', authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    // case LOGOUT:
    //   return { ...state, authenticated: false };
  }

  return state;
}
