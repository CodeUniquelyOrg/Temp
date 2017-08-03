import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

// HOC (Higher Order Component) - Wraps other components
export default function( ComposedComponent ) { // eslint-disable-line no-unused-vars

  // Authetication wrapper
  class Authentication extends Component {

    static contextTypes = {                    // eslint-disable-line no-undef
      router: PropTypes.object
    }

    // In V4 ROUTER - 'push' moved under history property
    componentWillMount() {
      if(!this.props.authenticated) {
        console.log('WILL MOUNT ', this.props); // eslint-disable-line no-console
        console.log('NOT LOGGED IN - PLEASE DO SO', this.props); // eslint-disable-line no-console
        this.context.router.history.push('/login');
      }
    }

    // In V4 ROUTER - 'push' moved under history property
    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} /> ;
    }
  }

  const mapStateToProps = state => {
    return { authenticated: state.auth.authenticated };
  };

  // state is in the redux - against his component
  return connect(mapStateToProps)(Authentication);
}
