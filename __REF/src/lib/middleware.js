// middlewares/api.js

import superAgent from 'superagent';

export const CALL_API = Symbol('CALL_API');

// ==========================================
//      And you can use it like this
// ==========================================
//
// store.dispatch({
//   [CALL_API]: {
//     method: 'get',
//     path: '/questions',
//     type: SENDING_QUESTIONS,
//     successAction: LOAD_QUESTION_SUCCESS,
//     failureAction: LOAD_QUESTION_FAILED
//   }
// });
//

// export default store(next) => {
//   return (action) => {
//   }
// }

// export const putUserData = (user) => {
//   return (dispatch) => {
//     Put('/users/me', user, (error,response) => {
//       if (error) {
//         return ErrorHandler(dispatch, error, USER_ERROR);
//       }
//       // contents - expecting an OBJECT
//       dispatch({ type: USER_DATA, payload: response.data || {}, });
//     });
//   };
// });
//
// BECOMES :-
//
// export const putUserData = user => dispatch => {
//   Put('/users/me', user, (error,response) => {
//     if (error) {
//       return ErrorHandler(dispatch, error, USER_ERROR);
//     }
//     // contents - expecting an OBJECT
//     dispatch({ type: USER_DATA, payload: response.data || {}, });
//   });
// };
//

export default store => next => action => {

  if (!action[CALL_API]) {
    return next(action);
  }

  const request = action[CALL_API];

  // assign somw constants from the request property
  const { method, path, query, type, failureAction, successAction } = request;

  // reference dispatch from store
  const { dispatch } = store;

  // content type ????
  // .set('Accept', 'application/json')
  // .set('Content-Type', 'application/json')
  // .type('json')

  // auth header ????
  // .set('Authentication', `BEARER ${token}`)

  // dispatch the type
  dispatch({ type: type });

  // make a request
  superAgent[method](path)
    .set('Accept', 'application/json')
    // .set({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
    .query(query)
    .end((err, res)=> {
      if (err) {
        dispatch({
          type: failureAction,
          response: err
        });
      } else {
        dispatch({
          type: successAction,
          response: res.body  // body should be JSON ('thats what we said we accept')
        });
      }
    });
};