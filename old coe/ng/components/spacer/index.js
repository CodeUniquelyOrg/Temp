//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// vertical spacer directive
//

import angular from 'angular';

// imports for the component
import directive from './directive';

// spacer styling
import 'style/spacer.scss';

export default angular.module('myApp.spacer', [])
  .directive('spacer', directive)
  .name;
