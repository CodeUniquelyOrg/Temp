//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Telephone Input directive
//
import angular from 'angular';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

export default angular.module('myApp.telephone-input', [utilsService])
  .directive('telephoneInput', directive)
  .name;
