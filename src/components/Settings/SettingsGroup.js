import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Material UI Components
import muiThemeable from 'material-ui/styles/muiThemeable';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';

// import a colour values
import { grey500 } from 'material-ui/styles/colors';

// Import Styles
import style from './group.pcss';

// make the avatar icon on the left hand side
const makeAvatar = (icon) => {
  return <Avatar icon={<FontIcon className="material-icons">{icon}</FontIcon>} />;
};

class SettingsGroup extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,

    description: PropTypes.string,
    // secondaryText: PropTypes.string,
    background: PropTypes.string,
    onUpdate: PropTypes.func,
  };

  static defaultProps = {
    background: 'white',
  };

  // WHEN YOU AHVE AN EMPTY DIV - IE11 IS SORTA BROKEN - HEIGHT:0 in Styles

  constructor(props) {
    super(props);
    // set initial state => REDUX THIS
    this.state = {
      open: false,
    };
  }

  openDrawer = () => {
    this.setState({
      open: true,
    });
  };

  closeDrawer = () => {
    this.setState({
      open: false
    });
  };

  updateValue = () => {
    if (this.props.onUpdate) {
      this.props.onUpdate();
    }
    this.setState({
      open: false
    });
  };

  // want to clone each <child (inject)=> onClose={onClose} onUpdate={onUpdate} />
  // renderChildren() {
  //   return React.Children.map(children, child => {
  //     if (child) {
  //       return React.cloneElement(child, { onClose, onUpdate });
  //     }
  //     return false;
  //   });
  // }

  render() {
    const {
      icon,
      title,
      background,
      onClick,
      muiTheme,   // this component is themeable
      ...other
    } = this.props;

    // Pull through the theme colours
    const color = muiTheme.appBar.color;
    const titleColor = muiTheme.palette.textColor;
    const subtitleColor = muiTheme.secondaryTextColor;

    const drawerheaderStyle = {
      backgroundColor: muiTheme.appBar.color,
      color: muiTheme.appBar.textColor,
    };

    // get the icon
    const iconElem = (
      <div className={style.icon}>
        {makeAvatar(icon)}
      </div>
    );

    const titleElem = (
      <div className={style.title} style={{ color: titleColor }}>
        {title}
      </div>
    );

    const currentValueElem = (
      <div className={style.currentValue} style={{ color: grey500 }}>
        not set
      </div>
    );

    // we have to adjust the fontsize to make it 32px and then let teh 8p padding
    // align the icon in the middle of the 48px by 48px square that holds the icon
    const nextElem = (
      <div className={style.next}>
        <FontIcon className={`material-icons ${style.next}`} style={{ fontSize:'32px' }} >navigate_next</FontIcon>
      </div>
    );

    // rotational issue with the use of DRAWER on mobiles
    // when the page rotates the UI does not update .....

    return (

      <div className={style.root}>
        <div className={style.groupLine} onClick={this.openDrawer}>
          {iconElem}
          {titleElem}
          {currentValueElem}
          {nextElem}
        </div>

        <Drawer width="100%" openSecondary={true} open={this.state.open} >
          <div className={style.drawerContents}>
            <div className={style.drawerHeader}>
              <FlatButton className={style.cancel} label="cancel" secondary onClick={this.closeDrawer}/>
              <div className={style.drawerTitle}>{title}</div>
              <FlatButton className={style.done} label="done" primary onClick={this.updateValue}/>
            </div>
            <div className={style.drawerChildren}>
              {this.props.children}
            </div>
          </div>
        </Drawer>

      </div>
    );
  }
}

export default muiThemeable()(SettingsGroup);
