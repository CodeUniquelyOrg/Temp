import React, { Component } from 'react';       // eslint-disable-line no-unused-vars

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// ========================================
// un-comment if you want to server FONTS
// ========================================
// import '/material-design-icons/iconfont/material-design-icons.css';
// import 'roboto-npm-webfont';
// import 'roboto-mono-webfont';

import Main from 'components/Main';             // eslint-disable-line no-unused-vars

// UGLY INJECT To deal with Touch Screens, until React Supports them natively
// - slated for (V1.0.0)
injectTapEventPlugin();

// The Themed Application
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <Main />
      </MuiThemeProvider>
    );
  }
}
