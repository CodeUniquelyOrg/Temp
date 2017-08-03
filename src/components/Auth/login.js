import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router';            // eslint-disable-line no-unused-vars

// pull in login from actions
import { loginUser } from 'actions';

// styling
import './style.pcss';

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
    <input className="form-control" {...field.input}/>
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
      <div className="center-vertical">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field name="email" className="form-control" component={renderField} type="text" />
          </div>
          <div>
            <label>Password</label>
            <Field name="password" className="form-control" component={renderField} type="password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

// connect state in redux to login form / login user
export default connect(mapStateToProps, { loginUser })(form(Login));
