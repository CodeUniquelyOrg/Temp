import React, { Component } from 'react';       // eslint-disable-line no-unused-vars
// import { connect } from 'react-redux';
// import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { Link } from 'react-router-dom';        // eslint-disable-line no-unused-vars
import Paper from 'material-ui/Paper';

// Material UI Components

// Local Components
import Logo from 'components/Logo';
import Translate from 'components/Translate';
import RegisterForm from 'components/RegisterForm';

// load regsiter user from the actions
// import { registerUser } from 'actions/auth';

// styling
import style from './style.pcss';

// const mapStateToProps = state => {
//   return {
//     errorMessage: state.auth.error,
//     message: state.auth.message
//   };
// };

// a i10n file is required - EXTERNALLY
// function validate(formProps) {
// const validate = (formProps) => {
//   const errors = {};
//
//   // if (!formProps.firstName) {
//   //   errors.firstName = 'Please enter a first name';
//   // }
//
//   // if (!formProps.lastName) {
//   //   errors.lastName = 'Please enter a last name';
//   // }
//
//   if (!formProps.email) {
//     errors.email = 'Please enter an email';
//   }
//
//   if (!formProps.password) {
//     errors.password = 'Please enter a password';
//   }
//
//   if (!formProps.retype) {
//     errors.retype = 'Please retype your password';
//   }
//
//   if (formProps.password !== formProps.retype) {
//     errors.password = 'Passwords don\'t match';
//     errors.retype = 'Passwords don\'t match';
//   }
//
//   return errors;
// };

// const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
//   <div>
//     <label className={style.label}>{<Translate id={label} />}</label>
//     <div>
//       <input autoComplete="off" className={style.input} {...input} placeholder={label} type={type} />
//       { touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>)) }
//     </div>
//   </div>
// );

// const form = reduxForm({
//   form: 'register',
//   validate
// });

class Register extends Component {
  // handleFormSubmit(formProps) {
  //   this.props.registerUser(formProps);
  // }

  // renderAlert() {
  //   if(this.props.errorMessage) {
  //     return (
  //       <div>
  //         <span><strong>Error!</strong> {this.props.errorMessage}</span>
  //       </div>
  //     );
  //   }
  // }

  // <div>
  //   <label className={style.label}>First Name</label>
  //   <Field name="firstName" className="form-control" component={renderField} type="text" />
  // </div>
  // <div>
  //   <label className={style.label}>Last Name</label>
  //   <Field name="lastName" className="form-control" component={renderField} type="text" />
  // </div>

  render() {
    // const { handleSubmit } = this.props;
    return (
      <div className={style.root}>
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

          <Paper zDepth={4}>
            <div className={style.form}>
              <RegisterForm />
            </div>
          </Paper>

          <div className={style.links}>
            <Link className={style.link} to="login">
              <Translate id="backToLogin" />
            </Link>
          </div>

        </div>
      </div>
    );
  }
}

// export default connect(mapStateToProps, { registerUser })(form(Register));
export default Register;