import React, { Component } from 'react';       // eslint-disable-line no-unused-vars

import injectTapEventPlugin from 'react-tap-event-plugin';

// Themeing in the App
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LightTheme from 'theme/LightTheme';
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';

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
      <MuiThemeProvider  muiTheme={getMuiTheme(LightTheme)}>
        <Main />
      </MuiThemeProvider>
    );
  }
}
