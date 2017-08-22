import React, { Component } from 'react';
import PropTypes from 'react-proptypes';

// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars

// Materials-UI Components
import { List, ListItem, makeSelectable } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';
// import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';

// Local Compoents
import Translate from 'components/Translate';
import ExpandableContent from 'components/ExpandableContent';

// Redux to Materila-UI wrappers
import { TextField } from 'redux-form-material-ui';

// import { SettingsGroup } from 'components/Settings';
import SettingsGroup from './SettingsGroup';

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

let SelectableList = makeSelectable(List);

// HOC - Wrapper Function
function wrapState(ComposedComponent) {
  return class SelectableList extends Component {
    static propTypes = {
      children: PropTypes.node.isRequired,
      defaultValue: PropTypes.number.isRequired,
    };

    componentWillMount() {
      this.setState({
        selectedIndex: this.props.defaultValue,
      });
    }

    handleRequestChange = (event, index) => {
      this.setState({
        selectedIndex: index,
      });
    };

    render() {
      return (
        <ComposedComponent
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
        >
          {this.props.children}
        </ComposedComponent>
      );
    }
  };
}

// Now Wrap the SelectableList in the HOC
SelectableList = wrapState(SelectableList);

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

const makeAvatar = (icon) => {
  return <Avatar icon={<FontIcon className="material-icons">{icon}</FontIcon>} />;
};

// =============================================
// validation functions
// =============================================
const required = value => (value == null ? 'Required' : undefined);

const email = value =>
  (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email'
    : undefined);

// ==========================================
//  STARTING FORM HERE - SPLITTING INTO PARTS
// ==========================================
const Settings = class Settings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  handleFormSubmit(formProps) {
    // this.props.saveSettings(formProps);
  }

  translate = (value) => {
    return <Translate id={value} />;
  }

  renderPressureUnits() {
    return (
      <div>
        <h3 className="style.h3">
          <Translate id="pressureUnits" />
        </h3>
        <RadioButtonGroup  name="pressure" defaultSelected="kPa">
          <RadioButton value="kPa" label="kPa" />
          <RadioButton value="bar" label="bar" />
          <RadioButton value="PSI" label="PSI" />
        </RadioButtonGroup>
      </div>
    );
  }

  renderDepthUnits() {
    return (
      <div>
        <h3 className="style.h3">
          <Translate id="depthUnits" />
        </h3>
        <RadioButtonGroup  name="depth"  defaultSelected="mm">
          <RadioButton value="mm" label="mm" />
          <RadioButton value="1/32" label='1/32"' />
        </RadioButtonGroup>
      </div>
    );
  }

  renderPeronalGreeting() {
    // <Field name="greeting" label="greeting" component={renderField} />
    return (
      <div>
        <Field
          name="greeting"
          ref="greeting"
          component={TextField}
          hintText={this.translate('greeting')}
          validate={[required]}
        />
      </div>
    );
  }
  renderTitle() {
    // <Field name="greeting" label="greeting" component={renderField} />
    return (
      <div>
        <Field
          name="title"
          ref="title"
          component={TextField}
          hintText={this.translate('title')}
          validate={[required]}
        />
      </div>
    );
  }
  renderPeronalForename() {
    return (
      <div>
        <Field
          name="forename"
          ref="forename"
          component={TextField}
          hintText={this.translate('forename')}
          validate={[required]}
        />
      </div>
    );
  }
  renderPeronalSurname() {
    return (
      <div>
        <Field
          name="surname"
          ref="surname"
          component={TextField}
          hintText={this.translate('surname')}
          validate={[required]}
        />
      </div>
    );
  }

  //
  // !!! HACK !!!
  //
  renderMobile() {
    return (
      <div>
        <Field
          name="mobile"
          ref="mobile"
          component={TextField}
          hintText={this.translate('mobile')}
          validate={[required]}
        />
      </div>
    );
  }
  renderEmail() {
    return (
      <div>
        <Field
          name="email"
          ref="email"
          component={TextField}
          hintText={this.translate('email')}
          validate={[required, email]}
        />
      </div>
    );
  }
  identity() {
    return 'steves@codeuniquely.co.uk';
  }
  mobileUpdated() {
    // on nothing
  }

  renderPassword() {
    return (
      <div>
        <Field
          name="password"
          ref="password"
          component={TextField}
          hintText={this.translate('password')}
          validate={[required]}
        />
      </div>
    );
  }
  passwordUpdated() {
    // on nothing
  }

  renderLanguages() {
    return (
      <div>
        <Field
          name="password"
          ref="password"
          component={TextField}
          hintText={this.translate('password')}
          validate={[required]}
        />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    // <SettingsList>  => checks if there are SettingsGroup or SettingsSwitch

    return (
      <div className={style.root}>

        <SettingsGroup icon="lock" title="Account Info" current={this.identity} onUpdate={this.mobileUpdated} >
          {this.renderEmail()}
          {this.renderMobile()}
          {this.renderPassword()}
        </SettingsGroup>

        <SettingsGroup icon="drive_eta" title="Vehicles" onUpdate={this.passwordUpdated} >
        </SettingsGroup>

        <SettingsGroup icon="mdi-account-settings" title="Preferences" onUpdate={this.passwordUpdated} >

          <SettingsGroup icon="language" title="Language" onUpdate={this.passwordUpdated} >
            {this.renderPressureUnits()}
          </SettingsGroup>

          <SettingsGroup icon="straighten" title="Depth Measurement" onUpdate={this.passwordUpdated} >
            {this.renderDepthUnits()}
          </SettingsGroup>

          <SettingsGroup icon="slow_motion_video" title="Pressures Measurement" onUpdate={this.passwordUpdated} >
            {this.renderPressureUnits()}
          </SettingsGroup>

        </SettingsGroup>

        <SettingsGroup icon="person" title="Personal" onUpdate={this.passwordUpdated} >
          {this.renderPeronalGreeting()}
          {this.renderPeronalForename()}
          {this.renderPeronalSurname()}

          <SettingsGroup icon="home" title="Address" onUpdate={this.passwordUpdated} >
          </SettingsGroup>

        </SettingsGroup>

      </div>
    );
  }
};

/*
  INVASIVE QUESTIONS

  <ExpandableContent
    title="Gender"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('gesture')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Deutsche Card Number"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('gesture')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>

*/

/*
  VEHICLE QUESTIONS

  <ExpandableContent
    title="Vehicle Registration Plate"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('drive_eta')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Recommended Tyre Pressures"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('slow_motion_video')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>

  <ExpandableContent
    title="TUV Check Date"
    secondaryText="Tyre pressure will be mesuaremed in"
    icon={makeAvatar('date_range')}
    content = {this.renderPressureUnits()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Vehicle Make"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('drive_eta')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Vehicle model"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('drive_eta')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Vehicle color"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('format_paint')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Vehicle year"
    secondaryText="Tyre tread will be measured in"
    icon={makeAvatar('date_range')}
    content = {this.renderDepthUnits()}
  >
  </ExpandableContent>
*/

/*
  ADDRESS QUESIONS

  <ExpandableContent
    title="Address Line 1"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('home')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Address Line 2"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('home')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Address Line 3"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('home')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Address Line 4"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('home')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
  <ExpandableContent
    title="Address Line 5"
    secondaryText="Your name and preferred greeting"
    icon={makeAvatar('home')}
    content = {this.renderPeronalGreeting()}
  >
  </ExpandableContent>
*/

export default Form(Settings);
// export default connect(mapStateToProps, { getUserData })(Form(Settings));
