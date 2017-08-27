import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars

// import TextField from 'material-ui/TextField';
import { TextField } from 'redux-form-material-ui';

// Components
import Logo from 'components/Logo';             // eslint-disable-line no-unused-vars

// translation
import Translate from 'components/Translate';   // eslint-disable-line no-unused-vars

// load regsiter user from teh actions
import { loginUser } from 'actions/auth';

// styling
import style from './style.pcss';

const mapStateToProps = state => {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  };
};

// // a i10n file is required - EXTERNALLY
// // function validate(formProps) {
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

// =============================================
// validation functions
// =============================================
const required = value => (value == null ? 'Required' : undefined);

const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

//
// <Field name="email" component={TextField} hintText="Email" floatingLabelText="Email" validate={[required, email]} />
//
// const renderField = ({ name, type, label, meta: { touched, error, warning }, ...rest }) => (
//   <TextField
//     type
//     name={name}
//     hintText={label}
//     floatingLabelText={label}
//     errorText={touched && error}
//   />
// );

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <label className={style.label}>{<Translate id={label} />}</label>
//     <div>
//       <input autoComplete="off" className={style.input} {...input} placeholder={label} type={type} />
//       { touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>)) }
//     </div>
//   </div>
// );

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

  // <div>
  //   <label className={style.label}>First Name</label>
  //   <Field name="firstName" className="form-control" component={renderField} type="text" />
  // </div>
  // <div>
  //   <label className={style.label}>Last Name</label>
  //   <Field name="lastName" className="form-control" component={renderField} type="text" />
  // </div>
  //
  //

  translate = (value) => {
    return <Translate id={value} />;
  }

  render() {

    const {
      pristine,
      handleSubmit,
      reset,
      submitting,
    } = this.props;

    // <Field name="email" type="text" label="email" className="form-control" component={renderField} />
    // <Field name="password" type="password" label="password" className="form-control" component={renderField} />

    return (
      <div className={style.root}>
        <div className={style.background}>
        </div>
        <div className={style.blurOverlay}>
        </div>
        <div className={`${style.contents}`}>
          <form  className={`${style.form} ${style.center}`} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
            <Logo />
            <div>
              {this.renderAlert()}
            </div>
            <div>
              <Field
                name="email"
                ref="email"
                component={TextField}
                hintText={this.translate('email')}
                hintText={this.translate('email')}
                validate={[required, email]}
              />
            </div>
            <div>
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
            <button type="submit" disabled={submitting} className={`${style.btn} ${style.primary}`}><Translate id="login" /></button>
          </form>
        </div>
      </div>
    );
  }
}

const Form = reduxForm({
  form: 'login',
  // validate
});

// const Form = reduxForm({
//   form: 'login',
//   initialValues: {
//     delivery: 'delivery',
//     name: 'Jane Doe',
//     cheese: 'Cheddar',
//     pizzas: 1,
//   },
// })(Login);

export default connect(mapStateToProps, { loginUser })(Form(Login));
// export default Form;
