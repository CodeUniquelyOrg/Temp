import { Get } from 'src/lib/Request';

import {
  TYRE_DATA,
} from './types';

export const tyreData = () => {
  const regNum = 'L5 MNE';
  const url = `/tyres/${regNum}`;

  // ===============================
  // redux-thunk is what allows this
  // ===============================
  return (dispatch) => {
    Get( url, response => {
      dispatch({
        type: TYRE_DATA,
        payload: response.data, // .content  - expecting an ARRAY
      });
    });
  };
};
