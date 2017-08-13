import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars
import Paper from 'material-ui/Paper';

// pull in login from actions
// import { loginUser } from 'actions/auth';

// Material UI Components

// Local Components
import Logo from 'components/Logo';
import LoginForm from 'components/LoginForm';
import Translate from 'components/Translate';

// styling
import style from './style.pcss';

// const mapStateToProps = state => {
//   return {
//     errorMessage: state.auth.error,
//     message: state.auth.message
//   };
// };

class Login extends Component {

  // onSubmitted(formProps) {
  //   this.props.loginUser(formProps);
  // }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className={style.page}>
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
              <LoginForm />
            </div>
          </Paper>

          <div className={style.links}>
            <Link className={style.link} to="register">
              <Translate id="createAccount" />
            </Link>
            <span>|</span>
            <Link className={style.link} to="forgot">
              <Translate id="forgotPassword" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

// connect state in redux to login form / login user
// export default connect(mapStateToProps, { loginUser })(form(Login));
// export default connect(mapStateToProps, { loginUser })(Login);
export default Login;
