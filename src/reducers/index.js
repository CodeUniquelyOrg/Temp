import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// oad eh authentication reducer
import authReducer from './auth';
import dataReducer from './data';
import i18nReducer from './i18n';

// combine the custom auth events with standard form events
const rootReducer = combineReducers({
  auth: authReducer,
  data: dataReducer,
  i18n: i18nReducer,
  form: formReducer
});

export default rootReducer;
