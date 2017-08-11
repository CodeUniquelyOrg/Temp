import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// Materials-UI Components
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
import { GridList, GridTile } from 'material-ui/GridList';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

// Local Componets
import Translate from 'components/Translate';

import style from './style.pcss';

const makeAvatar = (icon) => {
  return <Avatar icon={<FontIcon className="material-icons">{icon}</FontIcon>} />;
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

const History = class Settings extends Component {

  static propTypes = {
    history: PropTypes.array.isRequired,
    registration: PropTypes.string.isRequired,
    units: PropTypes.PropTypes.shape({
      pressure: PropTypes.string.isRequired,
      depth: PropTypes.string.isRequired,
    }),
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
            <TableHeaderColumn tooltip="The Tyre">Tyre</TableHeaderColumn>
            <TableHeaderColumn tooltip="The Pressure">Pressure</TableHeaderColumn>
            <TableHeaderColumn tooltip="The Depth">Depth</TableHeaderColumn>
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

  renderCard(date, tyres) {
    const {
      registration,
      ...rest,
    } = this.props;

    // <CardTitle title="Your Readings" subtitle="tyre pressure and depth measurements" />
    const table = this.renderTable(tyres);

    return (
      <Card>
        <CardHeader
          title={registration}
          subtitle={date}
          avatar={makeAvatar('drive_eta')}
        />
        <CardText>
          {table}
        </CardText>
      </Card>
    );
  }

  // [
  //   {
  //     "timestamp": "2017-09-10T08:29:49.000",
  //     "tyres": [
  //       { "id": "11", "pressure": 120.65123635, "depth": 3.53515371 },
  //       { "id": "12", "pressure": 242.56028291, "depth": 7.04479222 },
  //       { "id": "21", "pressure": 240.33778381, "depth": 7.19137197 },
  //       { "id": "22", "pressure": 242.12916137, "depth": 4.99517161 }
  //     ]
  //   },
  // ]
  renderGrid(history) {
    return history.map( (record) => {

      // cols={tile.featured ? 2 : 1}
      // rows={tile.featured ? 2 : 1}
      // title={date}
      // titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      // actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
      // actionPosition="left"
      // titlePosition="bottom"

      // const date = new Date(record.timestamp);
      // const date = new Intl.DateTimeFormat('de-DE').format(record.timestamp);
      const date = record.timestamp;
      return (
        <GridTile
          key={date}
          cols={1}
          rows={1}
        >
          {this.renderCard(date, record.tyres)}
        </GridTile>
      );
    });
  }

  render() {
    const {
      history,
      registration,
      ...rest,
    } = this.props;

    const regHistory = getHistoryForReg(history, registration);

    // cellHeight={300}

    return (
      <div className={style.root}>
        <GridList
          cols={1}
          cellHeight={320}
          padding={1}
          className={style.gridList}
        >
          {this.renderGrid(regHistory)}
        </GridList>
      </div>
    );
  }
};

export default History;
// export default connect(mapStateToProps, { getUserData })(Form(Settings));
