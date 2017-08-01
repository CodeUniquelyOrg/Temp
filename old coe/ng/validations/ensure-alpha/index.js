//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Alpha directive
//
import angular from 'angular';
import directive from './directive';

export default angular.module('myApp.ensure-alpha', [])
  .directive('ensureAlpha', directive)
  .name;
