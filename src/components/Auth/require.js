import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

// HOC (Higher Order Component) - Wraps other components
export default function( ComposedComponent ) { // eslint-disable-line no-unused-vars

  // Authetication wrapper
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} /> ;
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  // state is in the redux - against his component
  return connect(mapStateToProps)(Authentication);
}
