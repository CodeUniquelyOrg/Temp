//
// Handlers for user Data
//
import {
  USER_DATA,
  USER_ERROR,
} from 'constants/actionTypes';

import { Get, Put } from 'services/Request';

// GET 'my' data from the server
export const getUserData = () => dispatch => {
  Get('/users/me', null, dispatch, USER_DATA, USER_ERROR);
};

// // PUT 'my' data from the server
// export const putUserData = user => dispatch => {
//   Put('/users/me', user, dispatch, USER_DATA, USER_ERROR);
// };
