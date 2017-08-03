import React, { Component } from 'react';    // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import * as actions from 'actions';

import style from './style.scss';

const Dashboard = class Dashboard extends Component {

  constructor(props) {
    super(props);

    // DISPATCH  to the /ues API
    this.props.protectedTest();
  }

  renderUsers() {
    const {
      users,
    } = this.props;

    if(users) {
      return users.map( (user,i) => { // eslint-disable-line no-unused-vars
        return (
          <div key={i} className={style.user}>
            <span>{user.email}</span>
            <span>{user.disabled ? user.disabled ? 'True' : 'False' : 'False' }</span>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <h1>DASHBOARD</h1>
        <div className={style.users}>
          <div className={style.heading}>
            <span>email address</span>
            <span>disabled</span>
          </div>
          {this.renderUsers()}
        </div>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { users: state.auth.users };
}

export default connect(mapStateToProps, actions)(Dashboard);
