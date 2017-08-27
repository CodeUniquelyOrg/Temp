import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// LOAD ACTIONS -> Mapped to Dispatcher
import * as appActions from 'actions/app';

// Material UI Components
import Paper from 'material-ui/Paper';

// Local Components
import Logo from 'components/Logo';
import Translate from 'components/Translate';
import RegisterForm from 'components/RegisterForm';

// Code Form
import CodeForm from 'components/CodeForm';

// styling
import style from './style.pcss';

class Register extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // has the page been passed any parameters
  // componentDidMount() {
  //   const params = this.props.match.params;
  //   if (typeof params.code !== 'undefined') {
  //     this.props.actions.app.setCode(params.code);
  //   } else {
  //     this.props.actions.app.setCode('input-boxes');
  //   }
  //   // this.props.showLoading();
  // }

  renderCodeInputBoxes()  {
    return (
      <div className={style.root}>
        <div className={style.background}>
        </div>
        <div className={style.blurOverlay}>
        </div>
        <div className={`${style.contents}`}>

          <Logo className={style.logo} />
          <h1 className={style.h1}>
            Wheelright
          </h1>
          <h4 className={style.h4}>
            Lorem ipsum dolor sit amet, tritani adipisci tractatos ne mea.
          </h4>

          <Paper zDepth={4}>
            <div className={style.form}>
              <CodeForm />
            </div>
          </Paper>

          <div className={style.links}>
            <Link className={style.link} to="login">
              <Translate id="backToLogin" />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  // back now so navigate => dashboard
  doSomethingComplicated() {
    return (
      <div>
        <h1>I'm off doing something complicated</h1>
      </div>
    );
  }

  render() {
    const {
      code,
      ...rest,
    } = this.props;

    let contents;

    if (code) {
      contents= this.doSomethingComplicated();
    } else {
      contents = this.renderCodeInputBoxes();
    }

    return <div>{contents}</div>;
  }
}

const mapStateToProps = ({ app, user, history }) => {
  return {
    app,
    user: user.data,
    history: history.data,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      app: bindActionCreators(appActions, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(Register);
