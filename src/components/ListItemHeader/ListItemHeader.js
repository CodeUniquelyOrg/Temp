import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import muiThemeable from 'material-ui/styles/muiThemeable';

// Import Styles
import style from './style.pcss';

class ListItemHeader extends Component {

  static propTypes = {

    // id: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    secondaryText: PropTypes.string,
    icon: PropTypes.element,
    button: PropTypes.element,
    BgColor: PropTypes.string,
    // style: PropTypes.object,      // Allows styles to be passed to this component
    onClick: PropTypes.func,
    // transparent: PropTypes.bool,
    // rightIconElem: PropTypes.node,
  };

  static defaultProps = {
    id: '',
    className: '',
    BgColor: 'white',
    style: {},
  };

  // constructor(props) {
  //   super(props);
  // }
  render() {
    const {
      id,
      icon,
      title,
      secondaryText,
      button,
      BgColor,
      className,
      // style,
      onClick,
      muiTheme,   // this component is themeable
      ...other
    } = this.props;

    // Pull through the theme colours
    const color = muiTheme.appBar.color; //  'rgb(0, 188, 212)';
    const titleColor = muiTheme.palette.textColor; // '#212121';
    const subtitleColor = muiTheme.secondaryTextColor; //  '#717171';

    let IconElem, titleElem, subtitleElem, buttonElem;
    if (icon) {
      IconElem = (
        <div className={style.icon}>
          {icon}
        </div>
      );
    }
    if (title) {
      titleElem = (
        <div className={style.title} style={{ color: titleColor }}>
          {title}
        </div>
      );
    }
    if (secondaryText) {
      subtitleElem = (
        <div className={style.secondary} style={{ color: subtitleColor }}>
          {secondaryText}
        </div>
      );
    }
    if (button) {
      buttonElem = (
        <div className={style.button}>
          {button}
        </div>
      );
    }

    // {rightIconElem && <div className={style.rightIconElem}>{rightIconElem}</div>}
    // const scrim = this.props.scrim ? <div className={transparent ? 'scrimTop' : ''}/> : null;
    // {scrim}

    const headerStyle = subtitleElem ? style.hasSubtitle : style.noSubtitle;

    return (
      <div
        id={id}
        className={headerStyle}
        style={{ backgroundColor: color, ...style }}
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
        }}
        {...other}
      >
        <div className={style.fullLine}>
          {IconElem}
          <div className={style.headings}>
            {titleElem}
            {subtitleElem}
          </div>
          {buttonElem}
        </div>
      </div>
    );
  }
}

export default muiThemeable()(ListItemHeader);

// export default ListItemHeader;
