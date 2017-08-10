import React, { Component } from 'react';
import { connect } from 'react-redux';

import { tyreData } from 'actions/tyre';
import { getUserData } from 'actions/user';

// getUserData

// import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
// import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

// =====================================
// UI Styling and other stuff ike that
// =====================================
import Navigation from 'components/Navigation';
// import Plate from 'components/Plate';
// import Tyre from 'components/Tyre';
// import car from 'img/car.png';
import Car from 'components/Car';

// Styling
import style from './style.pcss';

const mapStateToProps = (state) => {
  return {
    tyres: state.data.tyres,
    user: state.user.user,
  };
};

// USE A DUMMY PLATE FOR NOW
const regNum = 'L5 MNE';

//
// *** WILl NEED TO use the TRANSLATE OBJECT HERE ***
//
const getNavigationItems = () => {
  return [
    { label: 'me',       icon: 'person',    path: '/settings' },
    { label: 'results',  icon: 'history',   path: '/history'  },
    { label: 'help',     icon: 'help',      path: '/faq'      },
  ];
};

const Dashboard = class Dashboard extends Component {

  constructor(props) {
    super(props);

    // get 'MY' user record
    this.props.getUserData();

    // HACK - DISPATCH tyre usage request to API
    this.props.tyreData(regNum);
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

  render() {

    const {
      user,
      tyres,
    } = this.props;

    let car;
    if ( user ) {

      // get the units from the user data
      const units = {
        pressure: user && user.presureUnits || 'PSI',
        depth: user && user.depthUnits || 'mm',
      };

      let vehicleData;
      if (user.registrations) {
        user.registrations.forEach( vehicle => {
          if ( vehicle.plate === regNum) {
            vehicleData = vehicle;
          }
        });

        // Async requests so check if they exist yet
        const tyreData = (tyres && tyres.tyres); //  || [];
        if ( tyreData ) {
          car = (
            <Car vehicle={vehicleData} tyres={tyreData} units={units} tolerence={0.4} />
          );
        }
      }
    }

    return (
      <div className={style.root}>

        <Navigation items={getNavigationItems()} />

        <div>
          {this.renderAlert()}
        </div>

        <h1>Your Latest Results</h1>
        {car}

      </div>
    );
  }
};

export default connect(mapStateToProps, { tyreData, getUserData })(Dashboard);
