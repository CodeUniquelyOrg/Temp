import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
// import { Route, Switch } from 'react-router-dom';       // eslint-disable-line no-unused-vars

import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
import Main from 'components/Main';             // eslint-disable-line no-unused-vars
import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <HeaderBar logo="test logo" />
        <div className = "page-content">
          <Main />
        </div>
        <FooterBar terms="" />
      </div>
    );
  }
}
