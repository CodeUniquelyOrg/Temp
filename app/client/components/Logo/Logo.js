import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import style from './Logo.css';

class Logo extends Component {
  render() {
    const {
      className,
      // muiTheme,   // this component is themeable
    } = this.props;

    // const fillColor = '#212121';
    const tileColor = 'transparent';

    return (
      <div className={`${style.center} ${className}`}>
        <Avatar backgroundColor={tileColor} size={160} icon={<FontIcon className='material-icons'>drive_eta</FontIcon>}/>
      </div>
    );
  }
}

export default Logo;
