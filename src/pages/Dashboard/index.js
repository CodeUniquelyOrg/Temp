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
import Plate from 'components/Plate';
import Tyre from 'components/Tyre';

import car from 'img/car.png';
import style from './style.scss';

const mapStateToProps = (state) => {
  return {
    tyres: state.data.tyres,
    user: state.user.user,
  };
};

const regNum = 'L5 MNE';

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

  labelNames(id) {
    switch(id) {
      case '11':
        return 'Front Left';
      case '12':
        return 'Front Right';
      case '21':
        return 'Rear Left';
      case '22':
        return 'Rear Right';
    }
    return 'unknown';
  }

  // convertPressureUnits(pressure) {
  //   const {
  //     user,
  //   } = this.props;

  //   if (!user.presureUnits ) {
  //     user.presureUnits =  'PSI';
  //   }
  //   if (user.presureUnits === 'PSI') {
  //     return Math.round(pressure * 0.145038,0);
  //   } else if ( user.presureUnits === 'bar') {
  //     return Math.round(pressure * 0.01,2);
  //   }
  //   return Math.round(pressure,0);
  // }

  // convertDepthUnits(depth) {
  //   const {
  //     user,
  //   } = this.props;

  //   if (!user.depthUnits ) {
  //     user.depthUnits =  'mm';
  //   }
  //   if (user.depthUnits === '1/32"') {
  //     return Math.round(depth * 1.259842519685037,2);
  //   }
  //   return Math.round(depth,0);
  // }

  getIdealPresuresForRegistration() {
    // look in the dta
    const {
      user,
    } = this.props;

    let ideal = [];

    // Loop through each vehicle
    user.registrations.forEach( reg => {
      if ( reg.plate === regNum) {
        ideal = reg.ideal;
      }
    });

    return ideal;
  }

  // each tyre pressures will be held as kPa
  getAveragePressure = (data)  => {
    let sigma= 0;
    if ( data.length ) {
      data.forEach( d => {
        sigma += d.pressure;
      });
    }
    return (sigma && sigma / data.length) || 230;
  };

  // ideal pressures will be held as kPa
  getIdealPressure = (idealPressures, id, average) => {
    let ideal;
    if (idealPressures.length) {
      idealPressures.forEach(i => {
        if (i.id === id) {
          ideal = i.pressure;
        }
      });
    }
    if (!ideal) {
      ideal = average;
    }
    return ideal;
  };

  //
  // *** WILl NEED TO use the TRANSLATE OBJECT HERE ***
  //
  getNavigationItems() {
    return [
      { label: 'me',       icon: 'user',     path: '/settings' },
      { label: 'results',  icon: 'history',  path: '/history'  },
      { label: 'help',     icon: 'question', path: '/faq'      },
    ];
  }

  renderTyres() {
    const {
      tyres,
      user
    } = this.props;

    if(tyres && tyres.tyres) {
      const data = tyres.tyres || [];

      const average = this.getAveragePressure(data);

      // lookup the usres ideal presssures
      const ideals = this.getIdealPresuresForRegistration();

      const units = {
        pressure: user.presureUnits || 'PSI',
        depth: user.depthUnits || 'mm',
      };

      return data.map( (t,i) => { // eslint-disable-line no-unused-vars

        // const p = this.convertPressureUnits(t.pressure);
        // const d = this.convertDepthUnits(t.depth);

        const ideal = this.getIdealPressure(ideals, t.name, average);
        // const full  = ideal * 2; // ideal is 50%
        const sigma = ideal * 0.4;  // full * 0.2 => 20% of full pressure => deviation

        return (
          <Tyre
            key = {i}
            className={style.tyre}
            id={t.name}
            label={this.labelNames(t.name)}

            // the data
            pressure={t.pressure}
            depth={t.depth}
            units={units}

            // upper and lower limit
            top={ideal + sigma + sigma}
            upper={ideal + sigma}
            lower={ideal - sigma}
            bottom={ideal - sigma - sigma}
            sigma={sigma}
          />
        );
      });
    }
  }

  // {this.renderTyres()}

  render() {

    const tyres = this.renderTyres();

    return (
      <div className={style.root}>

        <Navigation items={this.getNavigationItems()} />

        <div>
          {this.renderAlert()}
        </div>

        <h1>Your Latest Results</h1>
        <div className={style.plate}>
          <Plate registration={regNum} />
        </div>

        <div className={style.car}>
          <img src={car} />
          {tyres}
        </div>

      </div>
    );
  }
};

export default connect(mapStateToProps, { tyreData, getUserData })(Dashboard);
