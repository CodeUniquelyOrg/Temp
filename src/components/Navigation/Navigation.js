import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { connect } from 'react-redux';

import FontAwesome from 'react-fontawesome';

import style from './style.pcss';

// ====================================================
//  The component expects the reducer to be named navi
// ====================================================

/* eslint-disable no-unused-vars */
// const mapStateToProps = ({ i18n: { currentLanguage, dictionaries } }, ownProps) => ({
//   currentLanguage,
//   dictionary: dictionaries[ currentLanguage ]
// });

class Navigation extends Component {

  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  renderOptions = (items) => {
    if(items && items.length > 0) {
      return (
        items.map( (item,i) => {
          return (
            <div key={i} className={style.navItem}>
              <FontAwesome name={item.icon} />
            </div>
          );
        })
      );
    }
  };

  render() {
    const {
      items,
      dispatch, // pulling from properties
      ...rest
    } = this.props;

    return (
      <div className={style.root} {...rest}>
        <div className={style.wrapper} {...rest}>
          {this.renderOptions(items)}
        </div>
      </div>
    );
  }
}

export default connect()(Navigation);
