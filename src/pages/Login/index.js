import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// Components
// import Wrapper from 'components/Wrapper';     // eslint-disable-line no-unused-vars
import Logo from 'components/Logo';            // eslint-disable-line no-unused-vars

// translation
import Translate from 'components/Translate';   // eslint-disable-line no-unused-vars

// pull in login from actions
import { loginUser } from 'actions';

// styling
import style from './style.pcss';

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
};

// function mapStateToProps(state) {
//   return {
//     errorMessage: state.auth.error,
//     message: state.auth.message
//   };
// }

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
      { touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>)) }
    </div>
  </div>
);

/*
  <div>
    <input className={style.input} {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
*/

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
      <div className={style.root}>
        <form className={`${style.form} ${style.center}`} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <Logo />
          <div>
            {this.renderAlert()}
          </div>
          <div>
            <Field name="email" type="text" label="email" component={renderField} />
          </div>
          <div>
            <Field name="password" type="password" label="password" component={renderField} />
          </div>
          <button type="submit" className={`${style.btn} ${style.primary}`}>Login</button>
          <div className={style.links}>
            <Link className={style.link} to="register"><Translate id="createAccount" /></Link><span>|</span><Link className={style.link} to="forgot"><Translate id="forgotPassword" /></Link>
          </div>
        </form>
      </div>
    );
  }
}

// connect state in redux to login form / login user
export default connect(mapStateToProps, { loginUser })(form(Login));
