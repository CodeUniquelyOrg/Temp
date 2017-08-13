import React, { Component } from 'react';

// import logo from 'img/logo.png';
// import logo from 'img/esso.png';
// import logo from 'img/logo2.png';
// import logo from 'img/logo3.png';
// import logo from 'img/logo4.png';

// Material UI Components
import muiThemeable from 'material-ui/styles/muiThemeable';

import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import style from './style.pcss';

// const mapStateToProps = (state) => {
//   return {
//     authenticated: state.auth.authenticated,
//   };
// };
//  <Avatar icon={<FontIcon className="muidocs-icon-communication-voicemail" />} />
//  <div className={style.logo}>
//    <img className={style.image} src={logo}></img>
//  </div>

// <Avatar backgroundColor={tileColor} size={160} icon={<FontIcon className='material-icons'>drive_eta</FontIcon>}/>

class Logo extends Component {
  render() {
    const {
      className,
      muiTheme,   // this component is themeable
    } = this.props;

    const fillColor = muiTheme.palette.primary1Color; // '#212121';
    const tileColor = 'transparent'; // muiTheme.palette.primary1Color; // '#212121';

    return (
      <div className={`${style.center} ${className}`}>
        <Avatar backgroundColor={tileColor} size={160} icon={<FontIcon className='material-icons'>drive_eta</FontIcon>}/>
      </div>
    );
  }
}

export default muiThemeable()(Logo);
