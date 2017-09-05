//
// INVERSION OF CONTROl HOC ???
//
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as appActions from 'actions/app';
import * as userActions from 'actions/user';
import * as historyAction from 'actions/history';

class Store extends Component {

  constructor(props) {
    super(props);

    // Dispatch request to get 'MY' data
    this.props.actions.user.getUserData();
  }

  componentWillReceiveProps(newProps) {
    // when user data loads
    if (this.props.user !== newProps.user) {
      this.selectFirstRegistration(newProps);
    }

    // when they select a different vehicle
    if (this.props.app.selectedVehicle !== newProps.app.selectedVehicle) {
      this.fetchHistoryData(newProps);
    }
  }

  // define all the functions hat anipulate data
  selectFirstRegistration(newProps) {
    const {
      user
    } = newProps;
    if (user && user.registrations) {
      const vehicle = user.registrations[0];
      this.props.actions.app.selectVehicle(vehicle.vehicleIdentifier);
      // this.props.actions.app.selectIdentifier(vehicle.normalizedPlate);
    }
  }

  fetchHistoryData(newProps) {
    const {
      app
    } = newProps;

    const {
      actions
    } = this.props;

    // =====================================================
    // Get history for the selected vehicle =>
    // in practice this will require a numbr of lookups and a
    // an ASYNC query of [
    //   { vin, startDate, endDate }
    //   { vin, startDate, endDate }
    //   { vin, startDate, endDate }
    // ]
    // =====================================================
    actions.history.getHistoryData(app.selectedVehicle);
  }

  //
  // define some callback functions to allow children
  // to call back into this.context and make dispatches
  // happen when they need to
  //
  // store.dispatch( XXX:YYYYYY, data )
  //

  render() {
    const {
      app,
      user,
      history,
      children,
    } = this.props;

    // render the contained childrwen passing in user and history
    return React.Children.map(children, child => {
      if (child) {
        return React.cloneElement(child, { store:this, app, user, history });
      }
      return false;
    });
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    user: state.user.data,
    history: state.history.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      app: bindActionCreators(appActions, dispatch),
      user: bindActionCreators(userActions, dispatch),
      history: bindActionCreators(historyAction, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(Store);
