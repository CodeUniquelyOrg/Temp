import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars

// Materials-UI Components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

// Local Components
import Translate from 'components/Translate';

// local 'post-css' styling
import style from './style.pcss';

// Form Validation checks
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

// {...props}
const renderField = ({ name, label, meta: { touched, error, warning }, ...rest }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    name={name}
  />
);

const Form = reduxForm({
  form: 'login',      // form
  validate,           // validate
  // warn
});

class LoginForm extends Component {

  static propTypes = {
    submitted: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(formProps) {
    this.props.saveSettings(formProps);
    this.props.submitted();
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
      <form className={style.form} onSubmit={handleSubmit(this.onSubmit)}>
        {errorMessage && this.renderError(errorMessage)}
        <div className={style.formRow}>
          <Field name="email" type="text" label="email" component={renderField} />
        </div>
        <div className={style.formRow}>
          <Field name="password" type="password" label="password" component={renderField} />
        </div>
        <div className={style.formButtons}>
          <RaisedButton type="submit" primary={true} label={<Translate id="login" />} />
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

export default Form(LoginForm);
