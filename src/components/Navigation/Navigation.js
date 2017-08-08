import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import FontAwesome from 'react-fontawesome';

import style from './style.scss';

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
            <Link key={i} to={item.path}>
              <div className={style.navItem}>
                <span className={style.icon}>
                  <FontAwesome name={item.icon} />
                </span>
                <span className={style.spacer}></span>
                <span className={style.label}>
                  {item.label}
                </span>
              </div>
            </Link>
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
