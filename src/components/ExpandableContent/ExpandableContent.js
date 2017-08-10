import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// import { ForeOnBackground, FadeSlightly, AddOpacity } from 'common/colors';
// import { default as theme } from 'theme';

// Material UI Components
import FlatButton from 'material-ui/FlatButton';

// Local proejct Components
import ListItemHeader from 'components/ListItemHeader';

import style from './style.pcss';

class ExpandableContent extends Component {

  static propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string.isRequired,
    secondaryText: PropTypes.string,
    content: PropTypes.element.isRequired,
    fill: PropTypes.bool,
    BgImg: PropTypes.string,
    BgColor: PropTypes.string,
    // scrim: PropTypes.bool, // Renders scrim, useful for text overlay on to an image
  };

  static defaultProps = {
    color: '#000',
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
      // title,
      // secondaryText,
      // icon,
      content,
      BgImg,
      BgColor,
      fill,
      // scrim,
      className, // eslint-disable-line no-unused-vars, react/prop-types, prefer-const
      ...rest
    } = this.props;

    // take the color and turn it into a #hex value
    const textColor = '#212121'; // ForeOnBackground(BgColor);

    // let backColor = 'transparent';
    // if (fill) {
    //   backColor = FadeSlightly(BgColor);
    //   // if ( rgbaCapable ) {
    //   backColor = AddOpacity(backColor, 0.5);
    //   // }
    // }

    const isMoreShown = this.state.moreShown;

    const backgroundStyle = {
      backgroundImage: `url(${BgImg})`,
    };

    const buttonLabel = isMoreShown ? 'close' : 'open';
    const button = (
      <FlatButton primary={true} label={buttonLabel} onTouchTap={this.toggleMore}/>
    );

    // const scrimComponent = scrim ? <div className={style.scrim} /> : null;
    const header = (
      <ListItemHeader {...rest} button={button} />
    );

    let contents;
    if (isMoreShown) {
      contents =
        <div className={style.content}>{content}</div>
      ;
    }

    return (
      <div className={style.root} >
        {header}
        {contents}
      </div>
    );
  }

  /*
  render() {
    const {
      title,
      secondaryText,
      content,
      BgImg,
      BgColor,
      fill,
      // scrim,
      className, // eslint-disable-line no-unused-vars, react/prop-types, prefer-const
      ...rest
    } = this.props;

    // const {
    //   spacing,
    // } = theme;

    // take the color and turn it into a #hex value
    const textColor = '#212121'; // ForeOnBackground(BgColor);

    let backColor = 'transparent';
    // if (fill) {
    //   backColor = FadeSlightly(BgColor);
    //   // if ( rgbaCapable ) {
    //   backColor = AddOpacity(backColor, 0.5);
    //   // }
    // }

    const isMoreShown = this.state.moreShown;

    const backgroundStyle = {
      backgroundImage: `url(${BgImg})`,
    };

    // const scrimComponent = scrim ? <div className={style.scrim} /> : null;
    const buttonLabel = isMoreShown ? 'close' : 'open';
    const header =
      <div className={style.header} {...rest} style={backgroundStyle}>
        <div className={style.titleContainer} >
          <div className={style.title} style={{ color: textColor }}>
            <span style={{ backgroundColor: backColor }}>
              {title}
            </span>
          </div>
          <div>
            {secondaryText}
          </div>
          <div className={style.more}>
            <FlatButton primary={true} label={buttonLabel} onTouchTap={this.toggleMore}/>
          </div>
        </div>
      </div>
    ;

    let contents;
    if (isMoreShown) {
      contents =
        <div className={style.content}>{content}</div>
      ;
    }

    return (
      <div className={style.root} >
        {header}
        {contents}
      </div>
    );
  }
  */
}

export default ExpandableContent;
