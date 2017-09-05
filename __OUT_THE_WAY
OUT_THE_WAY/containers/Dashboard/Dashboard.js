import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// LOAD ACTIONS -> Mapped to Dispather
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
import style from './style.css';

// const mapStateToProps = (state) => {
//   return {
//     app: state.app,
//     user: state.user.data,
//     history: state.history.data,
//   };
// };

const mapStateToProps = ({ app, user, history }) => {
  return {
    app,
    user: user.data,
    history: history.data,
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

//
// This IS a 'CONTAINER COMPONENT' please read this article
// http://www.thegreatcodeadventure.com/the-react-plus-redux-container-pattern/
//
const Dashboard = class Dashboard extends Component {
  constructor(props) {
    super(props);

    // Dispatch request to get 'MY' data
    this.props.actions.user.getUserData();
  }

  // componentDidMount() {
  //   // select the first registration from the user
  //   // this.selectFirstRegistration();
  // }

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

  // componentWillUpdate(nextProps, nextState) {
  // }

  // componentDidUpdate(prevProps, prevState) {
  // }

  // driver will select a vehicle by 'friendly name' or 'Licence plate'
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
    if (user && user.registrations) {
      user.registrations.forEach( vehicle => {
        if (vehicle.vehicleIdentifier === app.selectedVehicle) {
          ideal = vehicle.ideal;
        }
      });
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
          if (vehicle.vehicleIdentifier === app.selectedVehicle) {
            vehicleData = vehicle;
          }
        });

        history.forEach( vehicle => {
          if (vehicle.vehicleIdentifier === app.selectedVehicle) {
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

      let historyData;
      history.forEach( vehicle => {
        if (vehicle.vehicleIdentifier === app.selectedVehicle) {
          historyData = vehicle.history;
        }
      });

      const ideal = this.getIdealVehicleValues() ;
      histroyElem = (
        <History history={historyData} registration={app.selectedRegistration} units={units} ideal={ideal} />
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

  tabChanged = (tab) => {
    this.props.actions.app.selectTab(tab.props.index); // ???
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

    // value={this.props.app.selectedTab}
    const initialIndex = this.props.app.selectedTab || 0;

    return (
      <div className={style.root}>

        <div>
          {this.renderAlert()}
        </div>

        <Tabs
          initialSelectedIndex={initialIndex}>
        >

          <Tab
            onActive={this.tabChanged}
            icon={<FontIcon className="material-icons">drive_eta</FontIcon>}
            label={<Translate id="main" />}
          >
            {this.renderCar()}
          </Tab>

          <Tab
            onActive={this.tabChanged}
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
            onActive={this.tabChanged}
            icon={<FontIcon className="material-icons">settings</FontIcon>}
            label={<Translate id="settings" />}
          >
            {this.renderSettings()}
          </Tab>

          <Tab
            onActive={this.tabChanged}
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
