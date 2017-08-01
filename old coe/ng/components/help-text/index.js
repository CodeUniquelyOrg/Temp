//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Help text directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.help-text', [])
  .directive('helpText', directive)
  .name;
