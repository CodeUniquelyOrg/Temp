//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Validate Integer directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.validate-integer', [])
  .directive('validateInteger', directive)
  .name;
