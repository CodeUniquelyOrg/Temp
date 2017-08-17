import {
  USER_DATA,

  UPDATE_MOBILE,
  UPDATE_EMAIL,
  UPDATE_TITLE,
  UPDATE_GREETING,
  UPDATE_FORENAME,
  UPDATE_SURNAME,

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

    case UPDATE_MOBILE: {
      return { ...state, user: action.payload };
    }
    case UPDATE_EMAIL: {
      return { ...state, user: action.payload };
    }
    case UPDATE_TITLE: {
      return { ...state, user: action.payload };
    }
    case UPDATE_GREETING: {
      return { ...state, user: action.payload };
    }
    case UPDATE_FORENAME: {
      return { ...state, user: action.payload };
    }
    case UPDATE_SURNAME: {
      return { ...state, user: action.payload };
    }

  }

  return state;
}
