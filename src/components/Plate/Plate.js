import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

import style from './style.pcss';

class Plate extends Component {

  static propTypes = {
    registration: PropTypes.string.isRequired,
  };

  render() {
    const {
      registration,
      // dispatch, // remove from properties
      ...rest
    } = this.props;

    //  <div className={style.root} { ...rest }>

    return (
      <div className={style.root}>
        {registration}
      </div>
    );
  }
}

export default connect()(Plate);
