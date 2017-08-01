//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Foot Note directive
//

import angular from 'angular';

// imports for the component
import directive from './directive';

// dependencies
import spacer from 'code/components/spacer';

// spacer styling
import 'style/footnote.scss';

export default angular.module('myApp.foot-note', [spacer])
  .directive('footNote', directive)
  .name;
