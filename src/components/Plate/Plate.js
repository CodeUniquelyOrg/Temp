import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

import style from './style.pcss';

class Plate extends Component {

  static propTypes = {
    registration: PropTypes.string.isRequired,
    isYellow: PropTypes.bool,
  };

  static defaultProps = {
    isYellow: false,
  };

  render() {
    const {
      registration,
      isYellow,
      // dispatch, // remove from properties
      ...rest
    } = this.props;

    const styleClass = isYellow ? style.yellow : style.white;

    //  <div className={style.root} { ...rest }>
    return (
      <div className={styleClass}>
        {registration}
      </div>
    );
  }
}

export default connect()(Plate);
