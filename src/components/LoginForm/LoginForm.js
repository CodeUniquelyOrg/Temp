import React, { Component } from 'react';
// import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// Auth 'action' to fire on submit
import { loginUser } from 'actions/auth';

// Materials-UI Components
// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// Redux to Materila-UI wrappers
import { TextField } from 'redux-form-material-ui';

// Local Components
import Translate from 'components/Translate';

// local 'post-css' styling
import style from './style.pcss';

// // Form Validation checks
// const validate = (formProps) => {
//   const errors = {};
//   if (!formProps.email) {
//     errors.email = 'Please enter an email';
//   }
//   if (!formProps.password) {
//     errors.password = 'Please enter a password';
//   }
//   return errors;
// };

// // {...props}
// const renderField = ({ name, type, label, meta: { touched, error, warning }, ...rest }) => (
//   <TextField
//     type
//     name
//     hintText={label}
//     floatingLabelText={label}
//     errorText={touched && error}
//   />
// );

// =============================================
// validation functions
// =============================================
const required = value => (value == null ? 'Required' : undefined);

const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

// Mapping
const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
};

// // Name the form and attach the validation
// const Form = reduxForm({
//   form: 'login',
//   validate
// });

class LoginForm extends Component {

  // static propTypes = {
  //   submitted: PropTypes.func.isRequired,
  // };

  translate = (value) => {
    return <Translate id={value} />;
  }

  // Just call the desired auth action - do whatever it means
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

  renderError(errorMessage) {
    return (
      <div className={style.error}>
        <Translate id="error"  />
        <strong>Error!</strong>
        {errorMessage}
      </div>
    );
  }

  renderForm() {
    const {
      handleSubmit,
      errorMessage,
    } = this.props;
    return (
      <form className={style.form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

        {errorMessage && this.renderError(errorMessage)}

        <div>
          {this.renderAlert()}
        </div>

        <div className={style.formRow}>
          <Field
            name="email"
            ref="email"
            component={TextField}
            hintText={this.translate('email')}
            hintText={this.translate('email')}
            validate={[required, email]}
          />
        </div>
        <div className={style.formRow}>
          <Field
            name="password"
            ref="password"
            type="password"
            component={TextField}
            hintText={this.translate('password')}
            hintText={this.translate('password')}
            validate={[required]}
          />
        </div>

        <div className={style.formButtons}>
          <RaisedButton type="submit" primary={true} fullWidth={true} label={<Translate id="login" />} />
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

const Form = reduxForm({
  form: 'login',
  // validate
})(LoginForm);

export default connect(mapStateToProps, { loginUser })(Form);
