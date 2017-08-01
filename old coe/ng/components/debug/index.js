//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Debug directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.debug', [])
  .directive('debug', directive)
  .name;
