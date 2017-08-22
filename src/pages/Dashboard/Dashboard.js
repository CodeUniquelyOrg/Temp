import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getUserData } from 'actions/user';
import { getHistoryData } from 'actions/history';
import { selectTab, selectRegistration, selectTyre } from 'actions/app';

import * as appActions from 'actions/app';
import * as userActions from 'actions/user';
import * as historyAction from 'actions/history';

// =====================================
// UI Styling and other stuff ike that
// =====================================

// Material UI Components
import { Tabs, Tab } from 'material-ui/Tabs';
import FontIcon from 'material-ui/FontIcon';
import Badge from 'material-ui/Badge';

// Local Components
import Car from 'components/Car';
import History from 'components/History';
import Settings from 'components/Settings';
import Faq from 'components/FAQ';
import Translate from 'components/Translate';

// Styling
import style from './style.pcss';

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

const Dashboard = class Dashboard extends Component {
  constructor(props) {
    super(props);

    // Dispatch get 'MY' user record action
    this.props.actions.user.getUserData();
  }

  // componentDidMount() {
  //   // select the first registration from the user
  //   // this.selectFirstRegistration();
  // }

  componentWillReceiveProps(newProps) {
    if (this.props.user !== newProps.user) {
      this.userHasLoaded(newProps);
    }

    if (this.props.app.selectedRegistration !== newProps.app.selectedRegistration) {
      this.fetchHistoryData(newProps);
    }
  }

  // componentWillUpdate(nextProps, nextState) {
  // }

  // componentDidUpdate(prevProps, prevState) {
  // }

  // WHEN UserDataCompletes => 'USER:USER_DATA' => reducer already fires ???
  userHasLoaded(newProps) {
    this.selectFirstRegistration(newProps);
    // better still
    // this.getAllHistoryDataForUser()
    //
    // => Builds a Query => registration.forEach() => {
    //  A) registration.fromDate => lastViewedDate against vechileId)  -> INTO LOCAL STORAGE
    //  B) registration.lastViewdDate => Now() against vechileId)
    // }
  }

  selectFirstRegistration(newProps) {
    const {
      user
    } = newProps;
    let selectedPlate;
    if ( user && user.registrations ) {
      this.props.actions.app.selectRegistration(user.registrations[0].normalizedPlate);
    }
  }

  fetchHistoryData(newProps) {
    const {
      app
    } = newProps;

    const {
      actions
    } = this.props;

    actions.history.getHistoryData(app.selectedRegistration);
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  getIdealVehicleValues() {
    const {
      user,
      app,
    } = this.props;

    let ideal;
    if ( user ) {
      if (user.registrations) { // && history) {

        user.registrations.forEach( vehicle => {
          if (vehicle.normalizedPlate === app.selectedRegistration) {
            ideal = vehicle.ideal;
          }
        });
      }
    }
    return ideal;
  }

  renderCar() {
    const {
      app,
      user,
      history,
    } = this.props;

    let car;
    if (user && history && history.length > 0) {

      // get the units from the user data
      const units = {
        pressure: user && user.preferences && user.preferences.presureUnits || 'PSI',
        depth: user && user.preferences && user.preferences.depthUnits || 'mm',
      };

      let vehicleData, historyData;

      if (user.registrations) {
        user.registrations.forEach( vehicle => {
          if (vehicle.normalizedPlate === app.selectedRegistration) {
            vehicleData = vehicle;
          }
        });

        history.forEach( vehicle => {
          if (vehicle.registration === app.selectedRegistration) {
            historyData = vehicle.history;
          }
        });

        // Async requests so check if they exist yet
        // const tyreData = (tyres && tyres.tyres); //  || [];
        const driveThrough = historyData[0]; // latest value
        if ( driveThrough ) {
          const tyreData = driveThrough.tyres;
          car = (
            <Car vehicle={vehicleData} tyres={tyreData} units={units} tolerence={0.2} />
          );
        }
      }
    }
    return car;
  }

  renderHistory() {
    const {
      app,
      user,
      history,
    } = this.props;

    let histroyElem;
    if (user && history && history.length > 0) {
      const units = {
        pressure: user.preferences && user.preferences.presureUnits || 'PSI',
        depth: user.preferences && user.preferences.depthUnits || 'mm',
      };

      const ideal = this.getIdealVehicleValues() ;
      histroyElem = (
        <History history={history} registration={app.selectedRegistration} units={units} ideal={ideal} />
      );
    }
    return histroyElem;
  }

  renderSettings() {
    const {
      user,
    } = this.props;

    let settingsElem;
    if(user) {
      settingsElem = (
        <Settings user={user} />
      );
    }
    return settingsElem;
  }

  render() {

    const {
      user,
      tyres,
      history,
    } = this.props;

    const badgeStyles = {
      position: 'absolute',
    };

    const activeTasksBadge = <Badge style={badgeStyles} secondary={true} badgeContent={6} />;

    return (
      <div className={style.root}>

        <div>
          {this.renderAlert()}
        </div>

        <Tabs>

          <Tab
            icon={<FontIcon className="material-icons">drive_eta</FontIcon>}
            label={<Translate id="main" />}
          >
            {this.renderCar()}
          </Tab>

          <Tab
            icon={
              <div>
                <FontIcon color="#ffffff" className="material-icons">history</FontIcon>
                {activeTasksBadge}
              </div>
            }
            label={<Translate id="history" />}
          >
            {this.renderHistory()}
          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">settings</FontIcon>}
            label={<Translate id="settings" />}
          >
            {this.renderSettings()}
          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">help</FontIcon>}
            label={<Translate id="help" />}
          >
            <Faq />
          </Tab>

        </Tabs>

      </div>
    );
  }
};

// export default connect(mapStateToProps, { getUserData, selectRegistration, getHistoryData })(Dashboard);
export default connect(mapStateToProps, mapDispatchToProps )(Dashboard);
