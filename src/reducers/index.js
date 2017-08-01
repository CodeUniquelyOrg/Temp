import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// oad eh authentication reducer
import authReducer from './auth';

// combine the custom auth events with standard form events
const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer
});

export default rootReducer;
