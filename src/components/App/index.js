import React, { Component } from 'react';       // eslint-disable-line no-unused-vars

import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Main from 'components/Main';             // eslint-disable-line no-unused-vars

import style from './style.pcss';

// UGLY INJECT To deal with Touch Screens
// until React Supports them natively slated for (V1.0.0)
injectTapEventPlugin();

import { grey900 } from 'material-ui/styles/colors';

// More on Colors: http://www.material-ui.com/#/customization/colors
const muiTheme = getMuiTheme({
  palette: {
    textColor: grey900,
  },
  // appBar: {
  //   height: 50,
  // },
});

// The Themed Application
export default class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className={`${style.blurOverlay}`}>
          <Main />
        </div>
      </MuiThemeProvider>
    );
  }
}
