//
// Light Theme
//
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

// .dark-primary-color    { background: #303F9F; }        - indigo700
// .default-primary-color { background: #3F51B5; }        - indigo500
// .light-primary-color   { background: #C5CAE9; }        - indigo100
// .text-primary-color    { color: #FFFFFF; }             - white
// .accent-color          { background: #8BC34A; }        - lightGreen800
// .primary-text-color    { color: #212121; }             - grey900
// .secondary-text-color  { color: #757575; }             - grey600
// .divider-color         { border-color: #BDBDBD; }      - grey400

// various colours and size for the theme
import {
  cyan500,
  red500,
  indigo700,
  indigo500,
  indigo100,
  grey900,
  grey600,
  grey400,
  grey100,
  lightGreen800,
  lightGreen500,
  white,
  darkBlack,
  fullBlack
} from 'material-ui/styles/colors';

// This replaces the textColor value on the palette
// and then update the keys for each component that depends on it.
// More on Colors: http://www.material-ui.com/#/customization/colors

const muiTheme = getMuiTheme({
  palette: {
    // primary1Color: indigo500,
    // primary2Color: indigo700,
    // primary3Color: grey400,
    accent1Color: indigo500,
    // accent2Color: grey100,
    // accent3Color: grey600,
    // textColor: darkBlack,
    // alternateTextColor: white,
    // canvasColor: white,
    // borderColor: grey400,
    // disabledColor: fade(darkBlack, 0.3),
    // pickerHeaderColor: indigo500,
    // clockCircleColor: fade(darkBlack, 0.07),
    // shadowColor: fullBlack,
  },
  badge: {
    // color: '#ffffff',
    // primaryColor: '#3f51b5',
    // primaryTextColor: '#ffffff',
    secondaryColor: red500,
    // secondaryTextColor: '#ffffff',
    // textColor:'rgba(0, 0, 0, 0.87)'
  },
});

export default muiTheme;