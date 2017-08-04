import React, { Component } from 'react';    // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as actions from 'actions';

// import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
// import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

import Tyre from 'components/Tyre';    // eslint-disable-line no-unused-vars

import style from './style.scss';

const mapStateToProps = (state) => {
  return { tyres: state.data.tyres };
};

const Dashboard = class Dashboard extends Component {

  constructor(props) {
    super(props);

    // DISPATCh tyre useage request to API
    this.props.tyreData();
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

  renderTyres() {
    const {
      tyres,
    } = this.props;
    if(tyres && tyres.tyres) {
      const data = tyres.tyres || [];
      return data.map( (t,i) => { // eslint-disable-line no-unused-vars
        return <Tyre key={i} id={t.name} label={this.labelNames(t.name)} pressure={t.pressure} depth={t.depth} />;
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

        {tyres}

      </div>
    );
  }
};

export default connect(mapStateToProps, actions)(Dashboard);
