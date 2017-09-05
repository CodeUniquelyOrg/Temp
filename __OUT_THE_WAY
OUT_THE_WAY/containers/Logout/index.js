import { Component } from 'react';                     // eslint-disable-line no-unused-vars
import PropTypes from 'react-proptypes';               // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';                 // eslint-disable-line no-unused-vars
import { withRouter } from 'react-router-dom';         // eslint-disable-line no-unused-vars

// import * as authActionCreators from '../actions/auth'; // eslint-disable-line no-unused-vars
import * as actions from 'actions/types';                    // eslint-disable-line no-unused-vars

import { logoutUser } from 'actions/auth';

const mapStateToProps = (state) => {
  return { ...state };
};

class Logout extends Component {
  static contextTypes = {                    // eslint-disable-line no-undef
    router: PropTypes.object
  }

  componentWillMount() {
    // this.props.dispatch(authActionCreators.logoutUser());
    this.props.logoutUser();
    this.context.router.history.push('/');
    // this.props.router.replace('/');
  }
  render() {
    return null;
  }
}

export default connect(mapStateToProps, { logoutUser })(Logout);
