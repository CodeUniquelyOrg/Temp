import React from 'react';           // eslint-disable-line no-unused-vars
import translatr from 'translatr';
import { connect } from 'react-redux';

// ====================================================
//  The component expects the reducer to be named i18n
// ====================================================

/* eslint-disable no-unused-vars */
const mapStateToProps = ({ i18n: { currentLanguage, dictionaries } }, ownProps) => ({
  currentLanguage,
  dictionary: dictionaries[ currentLanguage ]
});

const Translate = ({ currentLanguage, id, number, dictionary, dispatch, ...rest }) => {
  return <span>{translatr(dictionary, currentLanguage, id, number)}</span>;
};
/* eslint-enable no-unused-vars */

export default connect(mapStateToProps)(Translate);
