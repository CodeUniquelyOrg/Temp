import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

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
    open: PropTypes.bool,
  };

  static defaultProps = {
    color: '#000',
    open: false,
  }

  constructor(props) {
    super(props);
    this.toggleMore = this.toggleMore.bind(this);
    this.state = {
      moreShown: this.props.open,
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

    const backgroundStyle = {
      backgroundImage: `url(${BgImg})`,
    };

    const isMoreShown = this.state.moreShown;
    const buttonLabel = isMoreShown ? 'close' : 'open';
    const button = (
      <FlatButton primary={true} label={buttonLabel} onTouchTap={this.toggleMore}/>
    );

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
}

export default ExpandableContent;
