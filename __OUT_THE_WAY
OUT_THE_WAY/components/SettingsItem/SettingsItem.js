import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import muiThemeable from 'material-ui/styles/muiThemeable';

// Import Styles
import style from './style.pcss';

class SettingsItem extends Component {

  static propTypes = {
    icon: PropTypes.element.isRequired,
    title: PropTypes.PropTypes.string.isRequired,
    background: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    background: 'white',
  };

  // constructor(props) {
  //   super(props);
  // }

  clicked() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  // <SettingsGroup
  //   icon={makeAvatar('smartphone')}
  //   title="Mobile Phone Number"
  //   current = {this.currentWrapper(this.*formatFunc, user)}
  // >
  //   HOC() <*! 'INJECT into CONTEXT => closed() && => updated()'
  //   <Drawer width="100%" openSecondary={true} open={this.state.open}>
  //     <AppBar title="AppBar" />
  //      <header>
  //        Cancel  => parent.state.open => false
  //        [TITLE]
  //        Done    => pass drawer STATE => Parent props values && set parent.state.open => false
  //      <header>
  //      <TextField name="" initialValue={whatever} readonly />
  //      <TextField name="" /> => updates a state in drawer (NOT IN THE parent)
  //      <TextField name="" />
  //   </Drawer>
  // </SettingsGroup>

  //   <SettingsDrawer title={XXXX} model="user" inject[=> closed] inject[=>updated] > <*! 'INJECT into COMPONENT

  //      <HeaderBar>
  //        Cancel  => parent.state.open => this.props.close()
  //        [TITLE]
  //        Done    => pass drawer STATE => Parent props values && set parent.state.open => false
  //      <header>
  //      { CHILDREN }
  //      <TextField name="" initialValue={whatever} readonly />
  //      <TextField name="" /> => updates a state in drawer (NOT IN THE parent)
  //      <TextField name="" />
  //   </Drawer>
  // </SettingsGroup>




  // <SettingsGroup
  //   title="Mobile Phone Number"
  //   secondaryText="Your name and preferred greeting"
  //   icon={makeAvatar('smartphone')}
  //   content = {this.renderPeronalGreeting()}
  // >
  // </ExpandableContent>
  // <ExpandableContent
  //   title="Password"
  //   secondaryText="Your name and preferred greeting"
  //   icon={makeAvatar('lock')}
  //   content = {this.renderPeronalGreeting()}
  // >
  // </ExpandableContent>

  render() {
    const {
      icon,
      title,
      Background,
      className,
      onClick,
      muiTheme,   // this component is 'themeable'
      ...other
    } = this.props;

    // Pull through the theme colours
    const color = muiTheme.appBar.color;
    const titleColor = muiTheme.palette.textColor;
    const currentColor = muiTheme.palette.textColor;  // lighter grey is required

    const IconElem = (
      <div className={style.icon}>
        {icon}
      </div>
    );

    const titleElem = (
      <div className={style.title} style={{ color: textColor }}>
        {title}
      </div>
    );

    const currentValue = (
      <div className={style.title} style={{ color: currentColor }}>
        {title}
      </div>
    );

    return (
      <div className={headerStyle} style={{ backgroundColor: background }} onClick={this.clicked}
        {...other}
      >
        {IconElem}
        {titleElem}
        {buttonElem}
      </div>
    );
  }
}

export default muiThemeable()(SettingsItem);
