//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Note directive
//

import angular from 'angular';

// imports for the component
import directive from './directive';

// dependencies

// spacer styling
import 'style/note.scss';

export default angular.module('myApp.note', [])
  .directive('note', directive)
  .name;
