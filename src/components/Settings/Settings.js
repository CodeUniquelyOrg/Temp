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

  renderUnitsQuestions() {
    return (
      <div>
        <h3><Translate id="pressureUnits" /></h3>
        <RadioButtonGroup  name="pressure" defaultSelected="kPa">
          <RadioButton value="kPa" label="kPa" />
          <RadioButton value="bar" label="bar" />
          <RadioButton value="PSI" label="PSI" />
        </RadioButtonGroup>

        <br/>
        <br/>
        <h3><Translate id="depthUnits" /></h3>
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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={style.root}>
        <ExpandableContent
          title="Personal Information"
          secondaryText="Your name and preferred greeting"
          icon={makeAvatar('person')}
          content = {this.renderPeronalQuestions()}
        >
        </ExpandableContent>

        <ExpandableContent
          title="Measurement Units"
          secondaryText="Pressure and Depth mesuarement units"
          icon={makeAvatar('straighten')}
          content = {this.renderUnitsQuestions()}
        >
        </ExpandableContent>
      </div>
    );
  }
};

export default Form(Settings);
// export default connect(mapStateToProps, { getUserData })(Form(Settings));
