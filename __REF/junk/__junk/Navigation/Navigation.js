import React, { Component } from 'react';
import PropTypes from 'react-proptypes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import Button from 'react-toolbox/lib/button';
import FlatButton from 'material-ui/FlatButton';

// import style from './style.pcss';
import style from './style';
// import theme from 'theme/theme.pcss';
import theme from 'theme/theme';

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

  // <Button icon={item.icon} label={item.label} />

  // <div style="position: relative; width: 100%; display: flex; justify-content: center; background-color: rgb(255, 255, 255); height: 56px;">
  //   <button tabindex="0" type="button" style="border: 10px; box-sizing: border-box; display: inline-block; font-family: Roboto, sans-serif; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); cursor: pointer; text-decoration: none; margin: 0px; padding: 8px 12px 10px; outline: none; font-size: inherit; font-weight: inherit; position: relative; z-index: 1; transition: padding-top 0.3s; min-width: 80px; max-width: 168px; flex: 1 1 0%; background: none;">
  //     <div>
  //       <span style="height: 100%; width: 100%; position: absolute; top: 0px; left: 0px; overflow: hidden; pointer-events: none;"></span>
  //       <span class="material-icons" color="rgba(0, 0, 0, 0.54)" style="color: rgba(0, 0, 0, 0.54); position: relative; font-size: 24px; display: block; user-select: none; transition: all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms; width: 100%;">
  //         restore
  //       </span>
  //       <div style="font-size: 12px; transition: color 0.3s, font-size 0.3s; color: rgba(0, 0, 0, 0.54);">
  //         Recents
  //       </div>
  //     </div>
  //   </button>
  // </div>

  renderOptions = (items) => {
    if(items && items.length > 0) {
      return (
        items.map( (item,i) => {
          return (
            <Link key={i} to={item.path}>
              <div className={style.navItem}>
                <FlatButton label={item.label} primary={true} />
                <div className={`material-icons ${style.icon}`}>
                  {item.icon}
                </div>
                <div className={style.label}>
                  {item.label}
                </div>
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
