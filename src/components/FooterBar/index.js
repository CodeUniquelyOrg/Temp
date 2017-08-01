import React, { Component } from 'react';   // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';    // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';

class FooterBar extends Component {

  // renderLinks() {
  //   if (this.props.authenticated) {
  //     return [
  //       <li key={1}>
  //         <Link to="/">Home</Link>
  //       </li>,
  //       <li key={2}>
  //         <Link to="dashboard">Dashboard</Link>
  //       </li>,
  //       <li key={3}>
  //         <Link to="logout">Logout</Link>
  //       </li>,
  //     ];
  //   } else {
  //     return [
  //       // Unauthenticated navigation
  //       <li key={1}>
  //         <Link to="/">Home</Link>
  //       </li>,
  //       <li key={2}>
  //         <Link to="login">Login</Link>
  //       </li>,
  //       <li key={3}>
  //         <Link to="register">Register</Link>
  //       </li>,
  //     ];
  //   }
  // }

  render() {
    const d = new Date();
    const year = d.getFullYear();

    return (
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">© {year}, Wheelright. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default connect(mapStateToProps, null)(FooterBar);
