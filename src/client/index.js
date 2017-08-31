import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader'

import configureStore from 'store/configureStore';
import App from 'containers/App';

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const rootElement = document.getElementById('app');

render(
  <Provider store={store}>
    <AppContainer>
      <App/>
    </AppContainer>
  </Provider>,
  rootElement
);
