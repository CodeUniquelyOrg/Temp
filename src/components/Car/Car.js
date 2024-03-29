import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import Plate from 'components/Plate';
import Tyre from 'components/Tyre';
import ColorEdgeCard from'components/ColorEdgeCard';

import { red500, grey900, white, black } from 'material-ui/styles/colors';

import car from 'img/car.png';
import style from './style.pcss';

// ideal pressures will be held in DB as kPa
const getIdealPressure = (idealPressures, id, average) => {
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

// average of all tyre pressures - held in kPa
const getAveragePressure = (data)  => {
  let sigma= 0;
  if ( data.length ) {
    data.forEach( d => {
      sigma += d.pressure;
    });
  }
  return (sigma && sigma / data.length) || 230; // about 32 PSI
};

const convertPressureUnits = (pressure, units) => {
  if (units.pressure === 'psi') {
    return Math.round(pressure * 0.145038,0);
  } else if ( units.pressure === 'bar') {
    return Math.round(pressure * 0.01,2);
  }
  return Math.round(pressure,0);
};

const convertDepthUnits = (depth, units) => {
  if (units.depth === '1/32"') {
    return Math.round(depth * 1.259842519685037,1);
  }
  return Math.round(depth,2);
};

// HACK - THIS NEEDS TO BE SET-UP & PASSED IN CONFIG
const legalLimit = 4;

class Car extends Component {

  static propTypes = {

    // A 'vehicle' registration record
    vehicle: PropTypes.shape({
      plate: PropTypes.string.isRequired,
      // fromDate: PropTypes.instanceOf(Date).isRequired,
      fromDate: PropTypes.string.isRequired,
      ideal: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          pressure: PropTypes.number.isRequired,
        }),
      ),
    }),

    // The tyre data we pass in has this shape
    tyres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        pressure: PropTypes.number.isRequired,
        depth: PropTypes.number.isRequired,
        good: PropTypes.bool.isRequired,
      }),
    ).isRequired,

    // May be in users prefereneces - optional
    units: PropTypes.shape({
      pressure: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
    }),

    // what percentage is allowed on pressure
    tolerence: PropTypes.number,

    // expansion - allow car color to be changed ???
    colour: PropTypes.string,

    // PCSS Object, similar code style as react toolbox allowing
    // for Tyre color overrides and size overrides
    theme: PropTypes.object,
  }

  static defaultProps = {
    units: {
      pressure: 'psi',
      depth: 'mm',
    },
    tolerence: 0.2,  // 20%
    colour: 'blue',
    alt: true,
  }

  // renderTyres() {
  //   const {
  //     vehicle,
  //     tyres,
  //     units,
  //     tolerence,
  //   } = this.props;

  //   // what is the average pressure of all tyres
  //   const average = getAveragePressure(tyres);

  //   // get the vehicles' ideal tyre presssures
  //   const ideals = (vehicle && vehicle.ideal) || [];

  //   return tyres.map( (t,i) => {

  //     const ideal = getIdealPressure(ideals, t.id, average);

  //     // % of ideal pressure - shown as 1 guage deviation
  //     const sigma = ideal * tolerence / 2;

  //     return (
  //       <Tyre
  //         key = {i}
  //         className={style.tyre}
  //         id={t.id}
  //         good={t.good}

  //         // the data
  //         pressure={t.pressure}
  //         depth={t.depth}
  //         units={units}

  //         // upper and lower limit for guage
  //         top={ideal + sigma + sigma}
  //         upper={ideal + sigma}
  //         lower={ideal - sigma}
  //         bottom={ideal - sigma - sigma}
  //         sigma={sigma}
  //       />
  //     );
  //   });
  // }

  clicked = (id) => {
    // do somthing with the click on the
    console.log('CLICKED ', id);  // eslint-disable-line no-console
    this.card = (
      <ColorEdgeCard color={red500}>
        <h3>history and info about tyre goes here</h3>
      </ColorEdgeCard>
    );
  }

  renderLeftHandSide() {
    const {
      vehicle,
      tyres,
      units,
      tolerence,
    } = this.props;

    // what is the average pressure of all tyres
    const average = getAveragePressure(tyres);

    // get the vehicles' ideal tyre presssures
    const ideals = (vehicle && vehicle.ideal) || [];

    return tyres.map( (t,i) => {

      const ideal = getIdealPressure(ideals, t.id, average);

      // % of ideal pressure - shown as 1 guage deviation
      const sigma = ideal * tolerence;
      const over = ideal + sigma;
      const under = ideal - sigma;

      const pos = parseInt(t.id,10);
      if (pos % 2 === 1) {
        return (
          <Tyre

            key={t.id}
            id={t.id}

            className={style.altTyre}

            // presssure data
            pressure={convertPressureUnits(t.pressure,units)}
            under={t.pressure < under}
            over={t.pressure > over}

            // depth data
            depth={convertDepthUnits(t.depth,units)}
            worn={legalLimit}
            good={t.good}

            onClick={this.clicked}
          />
        );
      }
    });
  }

  renderRightHandSide() {
    const {
      vehicle,
      tyres,
      units,
      tolerence,
    } = this.props;

    // what is the average pressure of all tyres
    const average = getAveragePressure(tyres);

    // get the vehicles' ideal tyre presssures
    const ideals = (vehicle && vehicle.ideal) || [];

    return tyres.map( (t,i) => {

      const ideal = getIdealPressure(ideals, t.id, average);

      // % of ideal pressure - shown as 1 guage deviation
      const sigma = ideal * tolerence;
      const over = ideal + sigma;
      const under = ideal - sigma;
      const limit = legalLimit;

      const pos = parseInt(t.id,10);
      if (pos % 2 === 0) {
        return (
          <Tyre
            key={t.id}
            id={t.id}

            className={style.altTyre}

            // presssure data
            pressure={convertPressureUnits(t.pressure,units)}
            under={t.pressure < under}
            over={t.pressure > over}

            // depth data
            depth={convertDepthUnits(t.depth,units)}
            worn={limit}
            good={t.good}

            onClick={this.clicked}
          />
        );
      }
    });
  }

  render() {

    const {
      vehicle,
      // tyres,
      units,
      tolerence,
      alt,
      ...rest,
    } = this.props;

    if ( vehicle ) {

      if (alt) {
        return (
          <div className={style.altRoot}>

            <div className={style.altPlate}>
              <div className={style.altCentrePlate}>
                <Plate registration={vehicle.plate} isYellow={false} />
              </div>
            </div>

            <div className={style.altCar}>

              <div className={style.baseLayer}>
                <div className={style.altMiddle}>
                  <img src={car} />
                </div>
              </div>

              <div className={style.altOverlay}>
                <div className={style.altLeftSide}>
                  { this.renderLeftHandSide() }
                </div>
                <div className={style.altRightSide}>
                  { this.renderRightHandSide() }
                </div>
              </div>

            </div>

          </div>

        );
      }
    }

    return null;
  }
}

export default Car;
