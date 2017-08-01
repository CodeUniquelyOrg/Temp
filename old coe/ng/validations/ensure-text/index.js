//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Text directve
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.ensure-text', [])
  .directive('ensureText', directive)
  .name;
