import React, { Component } from 'react';        // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';   // eslint-disable-line no-unused-vars

// load regsiter user from teh actions
import { registerUser } from 'actions';

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

// a i10n file is required - EXTERNALLY
// function validate(formProps) {
const validate = (formProps) => {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.retype) {
    errors.retype = 'Please retype your password';
  }

  if (formProps.password !== formProps.retype) {
    errors.password = 'Passwords don\'t match';
    errors.retype = 'Passwords don\'t match';
  }

  return errors;
};

const renderField = field => (
  <div>
    <input className="form-control" {...field.input}/>
    {field.touched && field.error && <div className="error">{field.error}</div>}
  </div>
);

const form = reduxForm({
  form: 'register',
  validate
});

class Register extends Component {
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
    const {
      handleSubmit
    } = this.props;

    return (
      <form  className="center-vertical" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
        <div className="row">
          <div className="col-md-6">
            <label>First Name</label>
            <Field name="firstName" className="form-control" component={renderField} type="text" />
          </div>
          <div className="col-md-6">
            <label>Last Name</label>
            <Field name="lastName" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Retype Password</label>
            <Field name="retype" className="form-control" component={renderField} type="password" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default connect(mapStateToProps, { registerUser })(form(Register));
