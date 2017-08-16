import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Material UI Components
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

// import a colour values
import { grey500 } from 'material-ui/styles/colors';

// Local styling
import style from './style.pcss';

// make the avatar icon on the left hand side
const makeAvatar = (name,color) => {
  if (name.indexOf('mdi-') === 0) {
    return <Avatar backgroundColor={color} icon={<FontIcon className={`mdi ${name}`}/>} />;
  }
  return <Avatar backgroundColor={color} icon={<FontIcon className="material-icons">{name}</FontIcon>} />;
};

const Icon = ({ name, color = grey500 }) => {
  return (
    <div className={style.root}>
      {makeAvatar(name, color)}
    </div>
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Icon;
