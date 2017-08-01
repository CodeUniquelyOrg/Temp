//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Optional Telephone Input directive
//
import angular from 'angular';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

export default angular.module('myApp.optional-telephone-input', [utilsService])
  .directive('optionalTelephoneInput', directive)
  .name;
