import React, { PropTypes, Component } from 'react';
// import PropTypes from 'react-proptypes';
import { default as Framework } from '@c.p/reactify';
import { default as theme } from 'theme';

import style from './style.pcss';

const {
  Core: {
    Paper,
  },
} = Framework;

class ColorEdgeCard extends Component {

  static propTypes = {
    edged: PropTypes.bool,
    color: PropTypes.string,
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    edged: true,
    fullWidth: false,
    color: 'white',
  };

  renderChildren() {
    const {
      color,
      children,
    } = this.props;
    return React.Children.map(children, child => {
      if (child) {
        return React.cloneElement(child, { color });
      }
      return false;
    });
  }

  render() {
    const {
      edged,
      color,
      children,
      fullWidth,
      ...rest
    } = this.props;

    let edgeElem;
    if (edged) {
      // const edgeClass = style[color] || style.white;
      edgeElem = <div className={style.edge} style={{ backgroundColor: color }}/>;
    }

    // want to clone each <this.props.child color={color} >
    // can we use a CONTEXT ????
    const rootStyle = fullWidth ? style.fullWidth : style.halfWidth;

    return (
      <div className={rootStyle} {...rest}>
        <div className={style.bottomPad}>
          <Paper className="image-panel" zDepth={1} style={theme.card}>
            <div className={style.card}>
              {edgeElem}
              <div className={style.contents}>
                {this.renderChildren()}
              </div>
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

export default ColorEdgeCard;
