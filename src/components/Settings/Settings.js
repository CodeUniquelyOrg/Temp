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
import TextField from 'material-ui/TextField';

// Local Compoents
import ExpandableContent from 'components/ExpandableContent';
import Translate from 'components/Translate';

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

const Settings = class Settings extends Component {

  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  handleFormSubmit(formProps) {
    // this.props.saveSettings(formProps);
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

  renderUnitsQuestions() {
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

        <br/>
        <br/>
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

  renderPeronalQuestions() {
    return (
      <div>
        <Field name="greeting" label="greeting" component={renderField} />
        <br/>
        <Field name="forename" label="forename" component={renderField} />
        <br/>
        <Field name="surname" label="surname" component={renderField} />
        <br/>
      </div>
    );
  }

  renderPeronalGreeting() {
    return (
      <div>
        <Field name="greeting" label="greeting" component={renderField} />
      </div>
    );
  }
  renderPeronalForename() {
    return (
      <div>
        <Field name="forename" label="forename" component={renderField} />
      </div>
    );
  }
  renderPeronalSurname() {
    return (
      <div>
        <Field name="surname" label="surname" component={renderField} />
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={style.root}>

        <ExpandableContent
          title="Mobile Phone Number"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('smartphone')}
          content = {this.renderPeronalGreeting()}
        >
        </ExpandableContent>
        <ExpandableContent
          title="Password"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('lock')}
          content = {this.renderPeronalGreeting()}
        >
        </ExpandableContent>

        <ExpandableContent
          title="Greeting"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('person')}
          content = {this.renderPeronalGreeting()}
        >
        </ExpandableContent>
        <ExpandableContent
          title="Forenme"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('person')}
          content = {this.renderPeronalForename()}
        >
        </ExpandableContent>
        <ExpandableContent
          title="Surname"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('person')}
          content = {this.renderPeronalSurname()}
        >
        </ExpandableContent>

        <ExpandableContent
          title="Pressure Units"
          secondaryText="Tyre pressure will be mesuaremed in"
          icon={makeAvatar('slow_motion_video')}
          content = {this.renderPressureUnits()}
        >
        </ExpandableContent>
        <ExpandableContent
          title="Depth Units"
          secondaryText="Tyre tread will be measured in"
          icon={makeAvatar('straighten')}
          content = {this.renderDepthUnits()}
        >
        </ExpandableContent>

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
          title="Vehicle manufacturer"
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

      </div>
    );
  }
};

export default Form(Settings);
// export default connect(mapStateToProps, { getUserData })(Form(Settings));
