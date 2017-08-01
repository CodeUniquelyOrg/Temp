//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Button Bar & Button Group directive
//

import angular from 'angular';

// imports for the component
import buttonBar from './bar';

// dependencies

// styling
import 'style/button-bar.scss';

export default angular.module('myApp.button-bar', [])
  .directive('buttonBar', buttonBar)
  .name;
