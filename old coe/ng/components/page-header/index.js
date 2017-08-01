//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Page Header directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.page-header', [])
  .directive('pageHeader', directive)
  .name;
