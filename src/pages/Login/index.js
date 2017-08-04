import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// pull in login from actions
import { loginUser } from 'actions';

import logo from 'img/logo4.png';
// import logo from 'img/esso.png';

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

const renderField = field => (
  <div>
    <input className={style.input} {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

const form = reduxForm({
  form: 'login',
  validate
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
          <div>
            <img className={style.image} src={logo}></img>
          </div>
          {this.renderAlert()}
          <div>
            <label className={style.label}>Email</label>
            <Field component={renderField} type="text" name="email" />
          </div>
          <div>
            <label className={style.label}>Password</label>
            <Field component={renderField} type="password" name="password" />
          </div>
          <button type="submit" className={`${style.btn} ${style.primary}`}>Login</button>
          <div className={style.links}>
            <Link className={style.link} to="register">create an account</Link><span>|</span><Link className={style.link} to="register">forgot your password</Link>
          </div>
        </form>
      </div>
    );
  }
}

// connect state in redux to login form / login user
export default connect(mapStateToProps, { loginUser })(form(Login));
