import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tyreData } from 'actions/tyre';
import { getHistoryData } from 'actions/tyre';
import { getUserData } from 'actions/user';

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

// Styling
import style from './style.pcss';

const mapStateToProps = (state) => {
  return {
    history: state.data.history,
    tyres: state.data.tyres,
    user: state.user.user,
  };
};

// USE A DUMMY PLATE FOR NOW
const regNum = 'HD LS 704'; // L5 MNE';

// ==================================================
// *** WILl NEED TO use the TRANSLATE OBJECT HERE ***
// ==================================================

const getNormalisedRegNumber = (regNum) => {
  return regNum.replace(/\s/g, '');
};

const Dashboard = class Dashboard extends Component {

  constructor(props) {
    super(props);

    // get 'MY' user record
    this.props.getUserData();

    // HACK - assuming already have the reg - DISPATCH tyre usage request to API
    this.props.tyreData(regNum);

    // HACK - assuming already have the reg - DISPATCH
    this.props.getHistoryData(regNum);
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
    } = this.props;

    let ideal;
    if ( user ) {
      if (user.registrations) { // && history) {

        // database data will have condensed plate pattern
        // const condensed = getNormalisedRegNumber(regNum);

        user.registrations.forEach( vehicle => {
          if (vehicle.plate === regNum) {
            ideal = vehicle.ideal;
          }
        });
      }
    }
    return ideal;
  }

  renderCar() {
    const {
      user,
      history,
      tyres,
    } = this.props;

    let car;
    if ( user ) {

      // get the units from the user data
      const units = {
        pressure: user && user.presureUnits || 'PSI',
        depth: user && user.depthUnits || 'mm',
      };

      let vehicleData, historyData;

      if (user.registrations && history) {
        user.registrations.forEach( vehicle => {
          if (vehicle.plate === regNum) {
            vehicleData = vehicle;
          }
        });

        // database data wuill have condensed plate pattern
        const condensed = getNormalisedRegNumber(regNum);

        history.forEach( vehicle => {
          if (vehicle.registration === condensed) {
            historyData = vehicle.history;
          }
        });

        // Async requests so check if they exist yet
        // const tyreData = (tyres && tyres.tyres); //  || [];
        const driveThrough = historyData[0]; // latest value
        if ( driveThrough ) {
          const tyreData = driveThrough.tyres;
          car = (
            <Car vehicle={vehicleData} tyres={tyreData} units={units} tolerence={0.4} />
          );
        }
      }
    }
    return car;
  }

  renderHistory() {
    const {
      user,
      history,
    } = this.props;

    let histroyElem;
    if (user && history) {
      const units = {
        pressure: user && user.presureUnits || 'PSI',
        depth: user && user.depthUnits || 'mm',
      };

      const condensed = getNormalisedRegNumber(regNum);

      const ideal = this.getIdealVehicleValues();
      histroyElem = (
        <History history={history} registration={condensed} units={units} ideal={ideal} />
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
            label="MAIN"
          >
            {this.renderCar()}
          </Tab>

          <Tab
            icon={
              <div>
                <FontIcon className="material-icons">history</FontIcon>
                {activeTasksBadge}
              </div>
            }
            label="HISTORY"
          >
            {this.renderHistory()}
          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">settings</FontIcon>}
            label="SETTINGS"
          >
            {this.renderSettings()}
          </Tab>

          <Tab
            icon={<FontIcon className="material-icons">help</FontIcon>}
            label="HELP"
          >
            <Faq />
          </Tab>

        </Tabs>

      </div>
    );
  }
};

export default connect(mapStateToProps, { tyreData, getUserData, getHistoryData })(Dashboard);
