import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// pull in login from actions
import { loginUser } from 'actions/auth';

// Material UI Components

// Local Components
import Logo from 'components/Logo';
import LoginFom from 'components/LoginForm';
import Translate from 'components/Translate';

// styling
import style from './style.pcss';
// import theme from './button.pcss';

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
};

const validate = (formProps) => {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
};

// const warn = values => {
//   const warnings = {}
//   if (values.age < 19) {
//     warnings.age = 'Hmm, you seem a bit young...'
//   }
//   return warnings
// }

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label className={style.label}>{<Translate id={label} />}</label>
    <div>
      <input className={style.input} {...input} placeholder={label} type={type} />
      { touched && ((error && <span className={style.error}>{error}</span>) || (warning && <span>{warning}</span>)) }
    </div>
  </div>
);

const form = reduxForm({
  form: 'login',      // form
  validate,            // validate
  // warn
});

class Login extends Component {

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
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
          <div className={style.form}>
            <LoginFom  submitted={this.handleFormSubmit} />
          </div>
          <div className={style.links}>
            <Link className={style.link} to="register"><Translate id="createAccount" /></Link><span>|</span><Link className={style.link} to="forgot"><Translate id="forgotPassword" /></Link>
          </div>
        </div>
      </div>
    );
  }
}

// connect state in redux to login form / login user
export default connect(mapStateToProps, { loginUser })(form(Login));
