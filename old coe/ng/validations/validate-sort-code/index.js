//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Validate Sort Code directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.validate-sort-code', [])
  .directive('validateSortCode', directive)
  .name;
