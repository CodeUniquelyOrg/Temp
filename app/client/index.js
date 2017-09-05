//
// Index File for Client App
//
import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';  // 'components/App'
import reducers from './reducers';   // 'reducers'

// Appliation mount point in index.html
const mountPoint = document.getElementById('root');

// by reference into constant ????
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

// Include the REDUX_DEVTOOLS_EXTENSION
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create Redux store with initial state
const store = createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(thunk)));

// // do we have a TOKEN
// const token = getToken();

// import { AUTH_USER, SET_CURRENT_LANGUAGE } from 'constants/actionTypes';

// // Set 'redux' to 'authenicated' if we have a token
// // L8R: *** CHECK THE TOKEN IS STILL VALID ***
// if (token) {
//   store.dispatch({ type: AUTH_USER });
// }

// // also dispath the chnaging of a language
// const locale = getLanguage();
// if (locale) {
//   store.dispatch({ type: SET_CURRENT_LANGUAGE, data: locale });
// }

// render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
const mount = (Component: React.ComponentType<any>) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <IntlWrapper>
          <Component />
        </IntlWrapper>
      </Provider>
    </AppContainer>,
    mountPoint
  );
};

// Render the App
mount(App);

// For hot reloading of react components
if (module.hot) {
  module.hot.accept('./App', () => {
    mount(App);
  });
}

