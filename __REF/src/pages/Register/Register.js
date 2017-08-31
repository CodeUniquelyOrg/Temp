import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// LOAD ACTIONS -> Mapped to Dispatcher
import * as appActions from 'actions/app';
// import { showLoading, hideLoading } as loadingActions from 'react-redux-loading-bar';

// Material UI Components
import Paper from 'material-ui/Paper';

// Other Components
import LoadingBar from 'react-redux-loading-bar';

// Local Components
import Logo from 'components/Logo';
import Translate from 'components/Translate';
import RegisterForm from 'components/RegisterForm';

// styling
import style from './style.pcss';

class Register extends Component {

  // constructor(props) {
  //   super(props);
  // }

  // has the page been passed any parameters
  componentDidMount() {
    const params = this.props.match.params;
    if (typeof params.code !== 'undefined') {
      this.props.actions.app.setCode(params.code);
    } else {
      this.props.actions.app.setCode('input-boxes');
    }
    // this.props.showLoading();
  }

  // componentDidUpdate() {
  //   this.props.hideLoading();
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
              <RegisterForm />
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

  // render the wait cursor or loading bar
  renderLoadingBar() {
    return (
      <div className={style.root}>
        <LoadingBar />
        <h1>I'm off from doing something complicated</h1>
      </div>
    );
  }

  // back now so navigate => dashboard
  doSomethingComplicated() {
    return (
      <div>
        <LoadingBar />
        <h1>I'm back from doing something complicated</h1>
      </div>
    );
  }

  render() {
    const {
      app: {
        code
      },
      ...rest,
    } = this.props;

    // const params = this.props.match.params;
    let contents;

    if (!code) {
      contents = this.renderLoadingBar();
    } else if (code === 'input-boxes' ) {
      contents = this.renderCodeInputBoxes();
    } else {
      contents= this.doSomethingComplicated();
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
      // showLoading: bindActionCreators(showLoading, dispatch),
      // hideLoading: bindActionCreators(hideLoading, dispatch),
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps )(Register);
