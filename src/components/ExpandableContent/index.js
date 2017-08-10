import React, { PropTypes, Component } from 'react';
import Framework from '@c.p/reactify';
import { ForeOnBackground, FadeSlightly, AddOpacity } from 'common/colors';
import { default as theme } from 'theme';

import './style.less';

const {
  Core: {
    FlatButton,
  },
} = Framework;

class ExpandableContent extends Component {

  static propTypes = {
    BgImg: PropTypes.string,
    BgColor: PropTypes.string,
    title: PropTypes.string.isRequired,
    fill: PropTypes.bool,
    content: PropTypes.element.isRequired,
    scrim: PropTypes.bool, // Renders scrim, useful for text overlay on to an image
  };

  static get defaultProps() {
    return {
      color: 'black',
    };
  }

  constructor(props) {
    super(props);
    this.toggleMore = this.toggleMore.bind(this);

    this.state = {
      moreShown: false,
    };
  }

  toggleMore() {
    this.setState({
      moreShown: !this.state.moreShown,
    });
  }

  render() {
    const {
      title,
      content,
      BgImg,
      BgColor,
      fill,
      scrim,
      className, // eslint-disable-line no-unused-vars, react/prop-types, prefer-const
      ...other
    } = this.props;

    const {
      spacing,
    } = theme;

    // take the color and turn it into a #hex value
    const textColor = ForeOnBackground(BgColor);

    let backColor = 'transparent';
    if (fill) {
      backColor = FadeSlightly(BgColor);
      // if ( rgbaCapable ) {
      backColor = AddOpacity(backColor, 0.5);
      // }
    }

    const isMoreShown = this.state.moreShown;

    const backgroundStyle = {
      backgroundImage: `url(${BgImg})`,
    };

    const scrimComponent = scrim ? <div className="scrim"/> : null;
    const buttonLabel = isMoreShown ? 'close' : 'open';
    const header =
      <div className="header" {...other} style={backgroundStyle}>
        {scrimComponent}
        <div className="titleContainer" >
          <div className="title" style={{ textAlign: 'left', color: textColor }}>
            <span style={{ backgroundColor: backColor }}>
              {title}
            </span>
          </div>
          <div className="more" style={{ textAlign: 'right' }}>
            <FlatButton className="action-btn normal-1-2-em primaryFlatButton" label={buttonLabel} onTouchTap={this.toggleMore}/>
          </div>
        </div>
      </div>
    ;

    let contents;
    if (isMoreShown) {
      contents =
        <div className="content">{content}</div>
      ;
    }

    return (
      <div className="expandable-content" >
        {header}
        {contents}
      </div>
    );
  }
}

export default ExpandableContent;
