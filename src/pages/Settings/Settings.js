import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { getUserData } from 'actions/user';

// import HeaderBar from 'components/HeaderBar';   // eslint-disable-line no-unused-vars
// import FooterBar from 'components/FooterBar';   // eslint-disable-line no-unused-vars

import Translate from 'components/Translate';

// =====================================
// UI Styling and other stuff ike that
// =====================================
import { RadioGroup, RadioButton } from 'react-radio-buttons';
// import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';

import Navigation from 'components/Navigation';

import style from './style.pcss';

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label className={style.label}>{<Translate id={label} />}</label>
    <div>
      <input className={style.input} {...input} placeholder={label} type={type} />
      { touched && ((error && <span className={style.error}>{error}</span>) || (warning && <span>{warning}</span>)) }
    </div>
  </div>
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
  form: 'login',      // form
  validate,           // validate
  // warn
});

const Settings = class Settings extends Component {

  constructor(props) {
    super(props);

    // get 'MY' user record
    this.props.getUserData();
  }

  handleFormSubmit(formProps) {
    // this.props.saveSettings(formProps);
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

  //
  // *** WILl NEED TO use the TRANSLATE OBJECT HERE ***
  //
  getNavigationItems() {
    return [
      { label: 'home',     icon: 'home',     path: '/dashboard' },
      { label: 'results',  icon: 'history',  path: '/history'  },
      { label: 'help',     icon: 'question', path: '/faq'      },
    ];
  }

  // {this.renderTyres()}

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={style.root}>

        <Navigation items={this.getNavigationItems()} />

        <div>
          {this.renderAlert()}
        </div>

        <form className={`${style.form} ${style.center}`} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <h1><Translate id="myAccount" /></h1>

          <p>
            Lorem ipsum dolor sit amet, no populo causae mei, pro an quem quot invidunt,
            ei delicata pericula cum. Dolore populo disputationi ius at, virtute elaboraret
            scriptorem id nec. Vulputate maiestatis eu mel, magna zril ex vix. Dicam
            menandri deseruisse ei mel.
          </p>

          <h2><Translate id="preferences" /></h2>

          <h3 className={style.subHeading}><Translate id="pressureUnits" /></h3>
          <RadioGroup name="pressure" onChange={ this.onChangePressure }>
            <RadioButton value="kPa">kPa</RadioButton>
            <RadioButton value="bar">bar</RadioButton>
            <RadioButton value="PSI">PSI</RadioButton>
          </RadioGroup>

          <h3 className={style.subHeading}><Translate id="depthUnits" /></h3>
          <RadioGroup name="depth" onChange={ this.onChangeDepth }>
            <RadioButton value="mm">mm</RadioButton>
            <RadioButton value="1/32">1/32"</RadioButton>
          </RadioGroup>

          <h3 className={style.subHeading}><Translate id="personal" /></h3>
          <div>
            <Field name="greeting" type="text" label="greeting" component={renderField} />
          </div>
          <div>
            <Field name="forename" type="text" label="forename" component={renderField} />
          </div>
          <div>
            <Field name="surname" type="text" label="surname" component={renderField} />
          </div>

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

export default connect(mapStateToProps, { getUserData })(Form(Settings));
// export default connect(mapStateToProps, { loginUser })(form(Login));
