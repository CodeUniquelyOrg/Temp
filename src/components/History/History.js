import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Materials-UI Components
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';

// import a colour values
import { red500, green500, grey500 } from 'material-ui/styles/colors';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Local Components
import Translate from 'components/Translate';
import ExpandableContent from 'components/ExpandableContent';
import Icon from 'components/Icon';

// Styling for the component
import style from './style';

// const makeAvatar = (icon) => {
//   return <Avatar icon={<FontIcon className="material-icons">{icon}</FontIcon>} />;
// };

const getNormalisedRegNumber = (regNum) => {
  return regNum.replace(/\s/g, '');
};

// {
//   "registration": "L5 MNE",
//   "history": [
//     {
//       "timestamp": "2017-09-10T08:29:49.000",
//       "tyres": [
//         { "id": "11", "pressure": 120.65123635, "depth": 3.53515371 },
//         { "id": "12", "pressure": 242.56028291, "depth": 7.04479222 },
//         { "id": "21", "pressure": 240.33778381, "depth": 7.19137197 },
//         { "id": "22", "pressure": 242.12916137, "depth": 4.99517161 }
//       ]
//     }
//   ]
// }
const getHistoryForReg = (history, registration) => {
  let data;
  history.forEach( record => {
    if (record.registration === registration) {
      data = record.history;
    }
  });
  return data || [];
};

// const minPressure = 30 * 6.89476;   // FIX THESE
// const maxPressure = 36 * 6.89476;   // FIX THESE
const minDepth = 4;                 // LEGAL MIMIMUM !!!!

const History = class Settings extends Component {

  static propTypes = {
    history: PropTypes.array.isRequired,
    registration: PropTypes.string.isRequired,
    units: PropTypes.PropTypes.shape({
      pressure: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
    }),
    ideal: PropTypes.array.isRequired,
  };

  static defaultProps = {
    units: {
      pressure: 'PSI',
      depth: 'mm',
    },
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

  getIdealPressure(id) {
    const {
      ideal,
    } = this.props;

    let pressure;
    if (ideal && ideal.length > 0) {
      ideal.forEach( i => {
        if (i.id === id) {
          pressure = i.pressure;
        }
      });
    }
    return pressure;
  }

  tyreStatus(tyres) {
    let status;
    tyres.forEach( tyre => {

      // get the ideal pressure
      const idealPressure = this.getIdealPressure(tyre.id);
      if (typeof idealPressure !== 'undefined') {

        const maxPressure = idealPressure * 1.20;
        const minPressure = idealPressure * 0.80;

        if (status !== -1) {
          if (tyre.pressure < minPressure || tyre.pressure > maxPressure) {

            if (tyre.pressure < minPressure) {
              console.log( 'UNDER PRESSURE ', { id:tyre.id, pressure:tyre.pressure, limit:minPressure }); // eslint-disable-line
            }
            if (tyre.pressure > maxPressure) {
              console.log( 'OVER PRESSURE ', { id:tyre.id, pressure:tyre.pressure, limit:maxPressure }); // eslint-disable-line
            }
            status =-1;
          }
        }
      }

      // we are missing depth measuremen for tyre
      if (status !== -1 && tyre.depth === -1) {
        console.log( 'NO READING ', { id:tyre.id }); // eslint-disable-line
        status = 0;
      }

      // tyre tread depth is below 'minimum legal limit'
      if (tyre.depth !== -1  && tyre.depth < minDepth) {
        console.log( 'ILLEGAL TREAD', { id:tyre.id, depth:tyre.depth }); // eslint-disable-line
        status =-1;
      }

    });
    // if nothing has flagged as 'missing' or 'danger' on tyre
    if (typeof status === 'undefined') {
      console.log( 'GOOD TYRE'); // eslint-disable-line
      status = 1;
    }
    return status;
  }

  // FORMAT TEXT COLOURS
  convertPressureUnits(pressure) {
    const {
      units,
    } = this.props;

    if (units.pressure === 'PSI') {
      return Math.round(pressure * 0.145038,0);
    } else if ( units.pressure === 'bar') {
      return Math.round(pressure * 0.01,2);
    }
    return Math.round(pressure,0);
  }

  // FORMAT TEXT COLOURS
  convertDepthUnits(depth) {
    const {
      units,
    } = this.props;

    if (units.depth === '1/32"') {
      return Math.round(depth * 1.259842519685037,2);
    }
    return Math.round(depth,0);
  }

  renderTable(tyres) {
    // height={this.state.height}
    return (
      <Table fixedHeader={false} fixedFooter={false} selectable={false} multiSelectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Tyre</TableHeaderColumn>
            <TableHeaderColumn>Pressure</TableHeaderColumn>
            <TableHeaderColumn>Depth</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {tyres.map((tyre,index) => (
            <TableRow key={index}>
              <TableRowColumn>{this.labelNames(tyre.id)}</TableRowColumn>
              <TableRowColumn>{this.convertPressureUnits(tyre.pressure)}</TableRowColumn>
              <TableRowColumn>{this.convertDepthUnits(tyre.depth)}</TableRowColumn>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  formatDate(datestring) {
    const date = new Date(datestring);
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('de-DE', options );
  }

  formatTime(datestring) {
    const date = new Date(datestring);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleTimeString('de-DE', options );
  }

  // renderCard(date, tyres) {
  //   const {
  //     registration,
  //     ...rest,
  //   } = this.props;

  //   // <CardTitle title="Your Readings" subtitle="tyre pressure and depth measurements" />
  //   const table = this.renderTable(tyres);

  //   const status = this.tyreStatus(tyres);
  //   const background = status === -1 ? red500 : status === 1 ? green500 : grey500;
  //   // console.log('STATUS IS ', status ); // eslint-disable-line

  //   // title={registration}
  //   // secondaryText={date}

  //   return (
  //     <ExpandableContent
  //       title={registration}
  //       secondaryText={date}
  //       icon={ <Icon name="drive_eta" color={background} />}
  //       content = {table}
  //     />
  //   );
  // }

  renderList(history) {
    const {
      registration,
      ...rest,
    } = this.props;

    return history.map( (record, i) => {

      const tyres = record.tyres;
      const date =  this.formatDate(record.timestamp);
      const time =  this.formatTime(record.timestamp);

      // get the table of data
      const table = this.renderTable(tyres);
      const status = this.tyreStatus(tyres);
      const background = status === -1 ? red500 : status === 1 ? green500 : grey500;

      // title={registration}
      // secondaryText={date}

      return (
        <ExpandableContent key={i}
          open={i===0}
          title={date}
          secondaryText={time}
          icon={ <Icon name="drive_eta" color={background} />}
          content = {table}
        />
      );
    });
  }

  render() {
    const {
      history,
      registration,
      ...rest,
    } = this.props;

    // get the registration history for the required vehicle
    const regHistory = getHistoryForReg(history, registration);

    return (
      <div className={style.root}>
        {this.renderList(regHistory)}
      </div>
    );
  }
};

export default History;
