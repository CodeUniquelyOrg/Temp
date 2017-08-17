
import React from 'react';                                  // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';  // eslint-disable-line no-unused-vars
import { Redirect, browserHistory } from 'react-router';     // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux';                     // eslint-disable-line no-unused-vars
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
// import { cookie } from 'react-cookie';
// import { CookiesProvider, withCookies, Cookies } from 'react-cookie';
// import ReactGA from 'react-ga';                      // Google Analytics
// import { connect } from 'react-redux';               // eslint-disable-line no-unused-vars

// All The App Bits
import App from 'components/App';                       // eslint-disable-line no-unused-vars

// Support Functionality
// ===========================================
import reducers from 'reducers';

// Load AUTH_USER from teh action types
import { AUTH_USER, SET_CURRENT_LANGUAGE } from 'actions/types';

// Tokens API
import { getToken, getLanguage } from 'lib/Tokens';

// Initialize 'Google Analytics' with the portal ID
// ReactGA.initialize('UA-000000-01');

// Helper funtion to log chnages in page to 'Google Analytics'
// logPageView = () => {
//   ReactGA.pageview(window.location.pathname);
// }

// what DOM element is the React app going to be initiated at
const appElem = document.querySelector('.app');

// Get a state store and cookie for the application - called 'token'
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// do we have a TOKEN
const token = getToken();

// Set 'redux' to 'authenicated' if we have a token
// L8R: *** CHECK THE TOKEN IS STILL VALID ***
if (token) {
  store.dispatch({ type: AUTH_USER });
}

// also dispath the chnaging of a language
const locale = getLanguage();
if (locale) {
  store.dispatch({ type: SET_CURRENT_LANGUAGE, data: locale });
}

// Alternate with GA attached
// <Router history={browserHistory} routes={routes} onUpdate={logPageView} />

const portal = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
);

// Launch the Portal
ReactDOM.render(portal, appElem);
