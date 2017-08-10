import React, { Component, PropTypes } from 'react';
import { GetColor, ForeOnBackground, FadeSlightly } from 'common/colors';

import './style.less';

class ListItemHeader extends Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    subtitle: PropTypes.string,
    profileIcon: PropTypes.element,
    BgColor: PropTypes.string,
    transparent: PropTypes.bool, // Uses bgColor to decide text color but will render with a scrim and transparent instead
    scrim: PropTypes.bool, // Should a scrim be present, the overlay to allow text to be more visible (usally used for images)
    style: PropTypes.object, // Allows styles to be passed to this component
    onClick: PropTypes.func,
    rightIconElem: PropTypes.node,
  };

  static get defaultProps() {
    return {
      id: '',
      className: '',
      BgColor: 'white',
      transparent: false,
      style: {},
    };
  }

  // constructor(props) {
  //   super(props);
  // }
  render() {
    const {
      title,
      subtitle,
      profileIcon,
      BgColor,
      transparent,
      className,
      style,
      onClick,
      rightIconElem,
      ...other
    } = this.props;

    // handle colours
    const color = GetColor(BgColor);
    const titleColor = ForeOnBackground(color);
    const subtitleColor = FadeSlightly(titleColor);

    let IconElem, titleElem, subtitleElem;
    if (profileIcon) {
      IconElem =
        <div className="icon">{profileIcon}</div>
      ;
    }
    if (title) {
      titleElem =
        <div className="title" style={{ color: titleColor }}>{title}</div>
      ;
    }
    if (subtitle) {
      subtitleElem =
        <div className="subtitle" style={{ color: subtitleColor }}>{subtitle}</div>
      ;
    }

    const scrim = this.props.scrim ? <div className={transparent ? 'scrimTop' : ''}/> : null;
    return (
      <div
        id={this.props.id}
        className={`list-item-header-container ${className}`}
        style={{ backgroundColor: transparent ? 'transparent' : color, ...style }}
        onClick={e => {
          if (onClick) {
            onClick(e);
          }
        }}
        {...other}>
        {scrim}
        <div className={`list-item-header clearfix  ${subtitleElem ? '' : 'noSubtitle'}`} >
          {IconElem}
          <div className={`titles ${rightIconElem ? 'title-with-right-icon-elem' : ''}`}>
            {titleElem}
            {subtitleElem}
          </div>
          {rightIconElem && <div className="rightIconElem">{rightIconElem}</div>}
        </div>

      </div>
    );
  }
}

export default ListItemHeader;
