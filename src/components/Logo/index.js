import React, { Component } from 'react';  // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import style from './style.pcss';

// import logo from 'img/logo.png';
// import logo from 'img/esso.png';
// import logo from 'img/logo2.png';
// import logo from 'img/logo3.png';
import logo from 'img/logo4.png';

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

class Logo extends Component {

  render() {
    return (
      <div className={style.logo}>
        <img className={style.image} src={logo}></img>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Logo);
