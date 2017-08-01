//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Postcode Input directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

export default angular.module('myApp.postcode-input', [utilsService])
  .directive('postcodeInput', directive)
  .name;
