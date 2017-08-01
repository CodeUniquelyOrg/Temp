//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Sub Header directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.sub-header', [])
  .directive('subHeader', directive)
  .name;
