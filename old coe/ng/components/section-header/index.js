//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Section Header directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.section-header', [])
  .directive('sectionHeader', directive)
  .name;