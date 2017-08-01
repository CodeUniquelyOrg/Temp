//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Text Input directive
//
import angular from 'angular';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

export default angular.module('myApp.text-input', [utilsService])
  .directive('textInput', directive)
  .name;
