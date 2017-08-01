//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Digits directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.ensure-digits', [])
  .directive('ensureDigits', directive)
  .name;
