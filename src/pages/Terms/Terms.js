import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';  // eslint-disable-line no-unused-vars
import { getUserData } from 'actions/user';

import Translate from 'components/Translate';

// =====================================
// UI Styling and other stuff ike that
// =====================================
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

const Terms = class Terms extends Component {

  constructor(props) {
    super(props);

    // get 'MY' user record
    // this.props.getUserData();
  }

  handleFormSubmit(formProps) {
    // this.props.loginUser(formProps);
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

  // {this.renderTyres()}

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className={style.root}>

        <div>
          {this.renderAlert()}
        </div>

        <form className={`${style.form} ${style.center}`} onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

          <h1><Translate id="termsAndConditions" /></h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sagittis nunc est, id tincidunt
            acus laoreet accumsan. Aliquam quis massa molestie, suscipit arcu vitae, aliquam lacus. Aliquam
            justo justo, mollis in lectus id, porta auctor nisl. Morbi aliquam lorem leo, vitae consequat dui
            condimentum et. Phasellus et tristique urna, ac facilisis urna. Duis in dolor varius erat pulvinar
            vestibulum. Aliquam efficitur tellus nec tortor tempor elementum. Quisque sit amet nibh metus.
            Ut luctus, urna in finibus convallis, purus lectus rutrum quam, sit amet tempus elit diam in felis.
            Proin finibus rhoncus massa, sed faucibus dui ornare vitae.
          </p>

          <p>
            In lobortis lorem ac sapien facilisis, eu pretium arcu scelerisque. Sed risus erat, pretium eu
            egestas at, pulvinar id elit. In elementum quam vitae libero auctor, a elementum ipsum ornare.
            Aenean luctus, ipsum vel cursus eleifend, urna massa pharetra enim, nec hendrerit dolor lorem at mi.
            ed et dolor turpis. In blandit sem felis, nec rhoncus justo maximus ac. Vivamus venenatis consequat
            sem, sit amet consequat tortor condimentum et. Aliquam ultricies magna at est pharetra interdum.
            Morbi ut bibendum mauris. Vivamus sodales tempor aliquam. Praesent eu arcu porttitor, ultrices
            urna quis, tempor justo. Nullam venenatis facilisis ipsum a pellentesque. Donec facilisis efficitur
            lacus, nec posuere purus lobortis quis. Aenean fermentum nisi elit, ac rutrum arcu ornare sed.
            Aliquam erat felis, commodo et diam id, fermentum scelerisque sem. Donec ac egestas leo, vehicula
            porttitor lectus.
          </p>

          <p>
            Vestibulum non dui accumsan, lacinia urna quis, tempus libero. Ut et eros imperdiet, gravida dui vel,
            malesuada nisi. Fusce suscipit odio a nisl varius pulvinar. Ut laoreet gravida tortor vitae mollis.
            Nunc condimentum sem a iaculis condimentum. Praesent ac sem sed leo euismod malesuada et non erat. Nam
            uscipit lorem lacinia, laoreet leo ac, fermentum quam. Praesent leo ante, feugiat vel lacus at,
            ultrices malesuada est. Fusce hendrerit facilisis dui nec lacinia. Mauris ut ornare massa.
          </p>

          <p>
            Integer sed tempus quam. Ut euismod nibh tempus, dictum quam id, porta arcu. Maecenas orci lorem,
            finibus eu dignissim sit amet, pulvinar viverra augue. Nulla mollis velit eu mauris feugiat congue.
            Phasellus sit amet convallis mi, nec porttitor purus. Nulla elementum semper nisl, id scelerisque nibh
            commodo efficitur. Quisque imperdiet sagittis commodo. Donec posuere augue a lorem suscipit vehicula.
            Etiam vel maximus elit, ac porta orci.
          </p>

          <p>
            In id lobortis nulla. Fusce placerat neque sed nibh dignissim, eget feugiat metus ultricies. Sed
            sagittis in tortor id maximus. Quisque tempor tortor vitae leo commodo, nec iaculis ipsum gravida.
            Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Integer
            auctor eu mauris et imperdiet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
            ridiculus mus. Vivamus vel enim bibendum, luctus est eget, sagittis enim. Sed at euismod felis.
          </p>

          <button>
            <Translate id="iAcceptTheTerms" />
          </button>

        </form>

      </div>
    );
  }
};

export default connect(mapStateToProps, { getUserData })(Form(Terms));
// export default connect(mapStateToProps, { loginUser })(form(Login));
