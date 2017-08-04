import React, { Component } from 'react';       // eslint-disable-line no-unused-vars

import Main from 'components/Main';             // eslint-disable-line no-unused-vars

import style from './style.pcss';

export default class App extends Component {
  render() {
    return (
      <div className={`${style.blurOverlay}`}>
        <Main />
      </div>
    );
  }
}
