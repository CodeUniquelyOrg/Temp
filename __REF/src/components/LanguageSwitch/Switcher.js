import React from 'react'; // eslint-disable-line no-unused-vars
import { connect } from 'react-redux';
import { i18nActions } from 'redux-react-i18n';

const mapStateToProps = ({ i18n: { currentLanguage } } /* , ownProps */) => ( {
  currentLanguage
});

const mapDispatchToProps = (dispatch) => ({
  switchLanguage: (code) => dispatch(i18nActions.setCurrentLanguage(code))
});

const LanguageSwitcher = ({ currentLanguage, switchLanguage }) => {
  return (
    <div style={{ margin: '20px 0px 20px 0px' }}>
      <button className="btn btn-default" disabled={ currentLanguage === 'en-GB' } type="button" onClick={ () => switchLanguage('en-GB') }>English</button>
      <button className="btn btn-default" disabled={ currentLanguage === 'de-DE' } type="button" onClick={ () => switchLanguage('de-DE') }>Deutsche</button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitcher);
