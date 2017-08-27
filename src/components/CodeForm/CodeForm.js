import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

// Auth 'action' to fire on submit
import { registerUser } from 'actions/auth';

// Materials-UI Components
import RaisedButton from 'material-ui/RaisedButton';

// Local Components
import Translate from 'components/Translate';
import PinInput from  'components/PinInput';

// local 'post-css' styling
import style from './style.pcss';

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

class CodeForm extends Component {

  translate = (value) => {
    return <Translate id={value} />;
  }

  // Just call the desired auth action - do whatever it means
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderError(errorMessage) {
    return (
      <div className={style.error}>
        <strong><Translate id="error" /></strong>
        &nbsp;
        {errorMessage}
      </div>
    );
  }

  changed(value, index) {
    // something
  }

  complete(value, index) {
    // something
  }

  renderForm() {
    const {
      handleSubmit,
      errorMessage,
    } = this.props;
    return (
      <form className={style.form} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

        {errorMessage && this.renderError(errorMessage)}

        <div className={style.formRow}>
          <PinInput length={8} onChanged={this.changed} onComplete={this.complete} />
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
  form: 'code',
})(CodeForm);

export default connect(mapStateToProps, { registerUser })(Form);
