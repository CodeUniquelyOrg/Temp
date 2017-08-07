import React, { Component } from 'react';    // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

import * as actions from 'actions/tyre';    // *** !!! WHAT AM I MAPPING ***

// import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
// import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

// =====================================
// UI Styling and other stuff ike that
// =====================================
import Tyre from 'components/Tyre';    // eslint-disable-line no-unused-vars
import car from 'img/car.png';
import style from './style.scss';

const mapStateToProps = (state) => {
  return { tyres: state.data.tyres };
};

const regNum = 'L5 MNE';
// const userId = '59884692d900dd0fcc6927e4';

const Dashboard = class Dashboard extends Component {

  constructor(props) {
    super(props);

    // get the user record
    // this.props.getUserData(userId);

    // DISPATCH tyre usage request to API
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

  convertPressureUnits(pressure) {
    const {
      user,
    } = this.props;

    if (!user.presureUnits ) {
      user.presureUnits =  'PSI';
    }
    if (user.presureUnits === 'PSI') {
      return Math.round(pressure * 0.145038,0);
    } else if ( user.presureUnits === 'bar') {
      return Math.round(pressure * 0.01,2);
    }

    return Math.round(pressure,0);
  }

  convertDepthUnits(depth) {
    const {
      user,
    } = this.props;

    if (!user.depthUnits ) {
      user.depthUnits =  'mm';
    }
    if (user.depthUnits === '1/32"') {
      return Math.round(depth * 1.259842519685037,2);
    }
    return Math.round(depth,0);
  }

  getIdealPresuresForRegistration() {
    // look in the dta
  }

  renderTyres() {
    const {
      tyres,
    } = this.props;

    if(tyres && tyres.tyres) {
      const data = tyres.tyres || [];
      return data.map( (t,i) => { // eslint-disable-line no-unused-vars

        const p = this.convertPressureUnits(t.pressure);
        const d = this.convertPressureUnits(t.depth);

        return (
          <Tyre
            key = {i}
            className={style.tyre}
            id={t.name}
            label={this.labelNames(t.name)}
            pressure={p}
            depth={d}
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
        <div>
          {this.renderAlert()}
        </div>

        <div className={style.car}>
          <img src={car} />
          <div className={style.plate}>
            { regNum }
          </div>
          {tyres}
        </div>

      </div>
    );
  }
};

export default connect(mapStateToProps, actions)(Dashboard);
