import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// oad eh authentication reducer
import i18nReducer from './i18n';
import authReducer from './auth';
import userReducer from './user';
import dataReducer from './data';

// combine the custom auth events with standard form events
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  data: dataReducer,
  i18n: i18nReducer,
  form: formReducer
});

export default rootReducer;
