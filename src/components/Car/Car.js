import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

import Plate from 'components/Plate';
import Tyre from 'components/Tyre';

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
      pressure: 'PSI',
      depth: 'mm',
    },
    tolerence: 0.2,  // 20%
    colour: 'blue',
  }

  renderTyres() {
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

      return (
        <Tyre
          key = {i}
          className={style.tyre}
          id={t.id}

          // the data
          pressure={t.pressure}
          depth={t.depth}
          units={units}

          // upper and lower limit for guage
          top={ideal + sigma + sigma}
          upper={ideal + sigma}
          lower={ideal - sigma}
          bottom={ideal - sigma - sigma}
          sigma={sigma}
        />
      );
    });
  }

  render() {

    const {
      vehicle,
      // tyres,
      units,
      tolerence,
      ...rest,
    } = this.props;

    if ( vehicle ) {
      const tyres = this.renderTyres();

      //
      // [     image
      //
      //   [  Axel  1  ]
      //   [  Axel ... ]
      //   [  Axel  n  ]
      //
      //                 ]
      //

      return (
        <div className={style.root}>

          <div className={style.plate}>
            <Plate registration={vehicle.plate} isYellow={true} />
          </div>

          <div className={style.car}>
            <img src={car} />
            {tyres}
          </div>

        </div>
      );
    }

    return null;
  }
}

export default Car;