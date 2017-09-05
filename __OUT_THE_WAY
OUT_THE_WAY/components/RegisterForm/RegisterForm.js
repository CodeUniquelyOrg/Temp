import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Auth 'action' to fire on submit
import { registerUser } from 'actions/auth';

// Materials-UI Components
import RaisedButton from 'material-ui/RaisedButton';

// Redux to Materila-UI wrappers
import { TextField } from 'redux-form-material-ui';

// Local Components
import Translate from 'components/Translate';

// local 'post-css' styling
import style from './style.css';

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

class RegisterForm extends Component {

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
        <div className={style.formRow}>
          <Field
            name="retype"
            ref="retype"
            type="password"
            component={TextField}
            hintText={this.translate('retype')}
            hintText={this.translate('retype')}
            validate={[required]}
          />
        </div>

        <div className={style.formButtons}>
          <RaisedButton type="submit" primary={true} fullWidth={true} label={<Translate id="register" />} />
        </div>
      </form>
    );
  }

  render() {
    return this.renderForm();
  }
}

const Form = reduxForm({
  form: 'register',
})(RegisterForm);

export default connect(mapStateToProps, { registerUser })(Form);
