import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Material UI Components
import muiThemeable from 'material-ui/styles/muiThemeable';
import Toggle from 'material-ui/Toggle';

// Import Styles
import style from './group.pcss';

class SettingsSwitch extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    onUpdate: PropTypes.func,
    current: PropTypes.func,
  };

  updateValue = () => {
    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
  };

  getCurrent = () => {
    let current;
    if (this.props.current) {
      current = this.props.current();
    }
    return current || false;
  }

  render() {
    const {
      icon,
      title,
      muiTheme,   // this component is themeable
      ...other
    } = this.props;

    // get the icon
    const iconElem = <Icon name={icon}/>;

    const currentValueElem = (
      <Toggle
        style={styles.toggle}
        label={title}
        defaultToggled={this.getCurrent()}
        onToggle={this.updateValue}
      />
    );

    // rotational issue with the use of DRAWER on mobiles
    // when the page rotates the UI does not update .....

    return (
      <div className={style.root}>
        <div className={style.groupLine}>
          {iconElem}
          {currentValueElem}
        </div>
      </div>
    );
  }
}

export default muiThemeable()(SettingsSwitch);
