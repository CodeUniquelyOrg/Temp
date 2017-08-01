//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Wrap Text Input directive
//
import angular from 'angular';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

export default angular.module('myApp.wrap-text-input', [utilsService])
  .directive('wrapTextInput', directive)
  .name;
