import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

import style from './style.pcss';

// HOC (Higher Order Component) - Wraps other components in flexbox
export default function( ComposedComponent ) { // eslint-disable-line no-unused-vars

  // const mapStateToProps = state => {
  //   return { authenticated: state.auth.authenticated };
  // };

  // Authetication wrapper
  class Wrapper extends Component {

    static propTypes = {
      column: PropTypes.bool,
      row: PropTypes.bool,
    }

    // static get defaultProps() {
    static defaultProps = {
      column: true,
      row: false,
    }

    render() {
      return <div className={style.stack}>
        <ComposedComponent {...this.props} />
      </div>;
    }
  }

  // state is in the redux - against his component
  return connect()(Wrapper);
}
