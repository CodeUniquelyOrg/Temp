//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Postcode directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.ensure-postcode', [])
  .directive('ensurePostcode', directive)
  .name;
