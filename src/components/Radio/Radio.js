import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

class Radio extends Component {

  static propTypes = {
    label: PropTypes.string.isRequired,
    checked: PropTypes.string.isRequired,
  };

  render() {

    const {
      items,
      dispatch, // pulling from properties
      ...rest
    } = this.props;

    return (
      <div className={style.root} {...rest}>
        <div className={style.wrapper} {...rest}>
          {this.renderOptions(items)}
        </div>
      </div>
    );
  }
}

export default Radio;
