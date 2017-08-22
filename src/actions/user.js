//
// Handlers for user Data
//
import {
  USER_DATA,
  USER_ERROR,
} from './types';

import { ErrorHandler, Get } from 'src/lib/Request';

export const getUserData = () => dispatch => {

  // store.dispatch({
  //   [CALL_API]: {
  //     method: 'get',
  //     path: '/questions',
  //     type: SENDING_QUESTIONS,
  //     successAction: LOAD_QUESTION_SUCCESS,
  //     failureAction: LOAD_QUESTION_FAILED
  //   }
  // });

  // get 'MY' data from the server
  Get('/users/me', null, (error,response) => {
    if (error) {
      return ErrorHandler(dispatch, error, USER_ERROR);
    }
    // contents - expecting an OBJECT
    dispatch({ type: USER_DATA, payload: response.data || {}, });
  });
};

export const getUserDataNew = () => dispatch => {
  // get 'MY' data from the server
  Get('/users/me', null, dispatch, USER_ERROR, USER_DATA);
};

// export const getUserData = () => {
//   // =======================
//   // 'redux-thunk' signature
//   // =======================
//   return (dispatch) => {
//     // get 'MY' data from the server
//     Get('/users/me', null, (error,response) => {
//       if (error) {
//         return ErrorHandler(dispatch, error, USER_ERROR);
//       }
//       // contents - expecting an OBJECT
//       dispatch({ type: USER_DATA, payload: response.data || {}, });
//     });
//   };
// };

export const putUserData = user => dispatch => {
  // get 'MY' data from the server
  Put('/users/me', user, (error,response) => {
    if (error) {
      return ErrorHandler(dispatch, error, USER_ERROR);
    }
    // contents - expecting an OBJECT
    dispatch({ type: USER_DATA, payload: response.data || {}, });
  });
};
