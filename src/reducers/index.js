import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

// oad eh authentication reducer
import appReducer from './app';
import i18nReducer from './i18n';
import authReducer from './auth';
import userReducer from './user';
import historyReducer from './history';

// combine the custom auth events with standard form events
const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  user: userReducer,
  history: historyReducer,
  i18n: i18nReducer,
  form: formReducer,
});

export default rootReducer;
