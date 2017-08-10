import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars

import Translate from 'components/Translate';

import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';

import style from './style.pcss';

/*
const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label className={style.label}>{<Translate id={label} />}</label>
    <div>
      <input className={style.input} {...input} placeholder={label} type={type} />
      { touched && ((error && <span className={style.error}>{error}</span>) || (warning && <span>{warning}</span>)) }
    </div>
  </div>
);
*/

// {...props}

const renderField = ({ name, label, meta: { touched, error, warning }, ...rest }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    name={name}
  />
);

const validate = (formProps) => {
  const errors = {};
  // if (!formProps.email) {
  //   errors.email = 'Please enter an email';
  // }
  // if (!formProps.password) {
  //   errors.password = 'Please enter a password';
  // }

  return errors;
};

const Form = reduxForm({
  form: 'settings',      // form
  validate,              // validate
  // warn
});

const Settings = class Settings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  handleFormSubmit(formProps) {
    // this.props.saveSettings(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={style.form}>

        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <br/>
          <br/>
          <h1>
            <Translate id="myAccount" />
          </h1>
          <br/>
          <br/>

          <p>
            Lorem ipsum dolor sit amet, no populo causae mei, pro an quem quot invidunt,
            ei delicata pericula cum. Dolore populo disputationi ius at, virtute elaboraret
            scriptorem id nec. Vulputate maiestatis eu mel, magna zril ex vix. Dicam
            menandri deseruisse ei mel.
          </p>
          <br/>
          <br/>

          <h2><Translate id="preferences" /></h2>
          <br/>

          <h3><Translate id="pressureUnits" /></h3>
          <br/>
          <br/>
          <RadioButtonGroup  name="pressure" defaultSelected="kPa">
            <RadioButton value="kPa" label="kPa" />
            <RadioButton value="bar" label="bar" />
            <RadioButton value="PSI" label="PSI" />
          </RadioButtonGroup>

          <h3><Translate id="depthUnits" /></h3>
          <br/>
          <br/>
          <RadioButtonGroup  name="depth"  defaultSelected="mm">
            <RadioButton value="mm" label="mm" />
            <RadioButton value="1/32" label='1/32"' />
          </RadioButtonGroup>

          <h3><Translate id="personal" /></h3>
          <Field name="greeting" label="greeting" component={renderField} />
          <br/>
          <Field name="forename" label="forename" component={renderField} />
          <br/>
          <Field name="surname" label="surname" component={renderField} />
          <br/>

          <h3 className={style.subHeading}><Translate id="registrations" /></h3>
          <p>
            <mark>Some way to choose from the registrations</mark>
            <mark>and edit tyre pressures for them / delete</mark>
          </p>

        </form>

      </div>
    );
  }
};

export default Form(Settings);
// export default connect(mapStateToProps, { getUserData })(Form(Settings));