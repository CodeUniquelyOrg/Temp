
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
import { AUTH_USER } from 'actions/types';

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

// const token = cookie.get('token');
const token = localStorage.getItem('token');

// Set 'redux' to 'authenicated' if we have a token
// -LA8R: CHECK THE TOKEN ISVALID
if (token) {
  store.dispatch({ type: AUTH_USER });
}

// Alternate with GA attached
// <Router history={browserHistory} routes={routes} onUpdate={logPageView} />

// <Route path="*" component={NotFoundPage} />
//   <div>
//    <Route path="**" component={App} />
//  </div>

const portal = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <App />
    </Router>
  </Provider>
);

// Launch the Portal
ReactDOM.render(portal, appElem);
