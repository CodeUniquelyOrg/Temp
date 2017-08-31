import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Material UI Components
// import muiThemeable from 'material-ui/styles/muiThemeable';

// Import Styles
// import style from './style.pcss';

class SettingsDrawer extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    onUpdate: PropTypes.func,
  };
  render() {
    const {
      onClose,
      onUpdate,
      children,
    } = this.props;

    // want to clone each <child (inject)=> onClose={onClose} onUpdate={onUpdate} />
    return React.Children.map(children, child => {
      if (child) {
        return React.cloneElement(child, { onClose, onUpdate });
      }
      return false;
    });
  }
}

export default SettingsDrawer;
