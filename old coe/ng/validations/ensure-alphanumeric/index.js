//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Alphanumeric directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.ensure-alphanumeric', [])
  .directive('ensureAlphanumeric', directive)
  .name;