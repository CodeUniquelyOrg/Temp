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
//     sendingType: SENDING_QUESTIONS,
//     successType: LOAD_QUESTION_SUCCESS,
//     failureType: LOAD_QUESTION_FAILED
//   }
// });
//

export default store => next => action => {

  if (!action[CALL_API]) {
    return next(action);
  }

  const request = action[CALL_API];
  const { method, path, query, failureType, successType, sendingType } = request;
  const { dispatch } = store;

  // content type ????
  // .type('json')
  // .set('Accept', 'application/json')

  // auth header ????
  // .set('Authentication', `BEARER ${token}`)

  dispatch({ type: sendingType });
  superAgent[method](path)
    .query(query)
    .end((err, res)=> {
      if (err) {
        dispatch({
          type: failureType,
          response: err
        });
      } else {
        dispatch({
          type: successType,
          response: res.body
        });
      }
    });
};