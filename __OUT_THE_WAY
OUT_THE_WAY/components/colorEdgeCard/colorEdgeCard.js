import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Material UI Components
import Paper from 'material-ui/Paper';

// Local Styling
import style from './style.pcss';

class ColorEdgeCard extends Component {

  static propTypes = {
    edged: PropTypes.bool,
    color: PropTypes.string,
    background: PropTypes.string,
    fullWidth: PropTypes.bool,
  };

  static defaultProps = {
    edged: true,
    fullWidth: false,
    color: '#313131',     // needs to be themeble
    background: 'white',  // needs to be themeble
  };

  renderChildren() {
    const {
      color,
      background,
      children,
    } = this.props;

    // want to clone each <child (inject)=> background={background} color={color} />
    return React.Children.map(children, child => {
      if (child) {
        return React.cloneElement(child, { color, background });
      }
      return false;
    });
  }

  render() {
    const {
      edged,
      color,
      background,
      children,
      fullWidth,
      ...rest
    } = this.props;

    let edgeElem;
    if (edged) {
      edgeElem = <div className={style.edge} style={{ backgroundColor: background }}/>;
    }

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
