//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Text Only Input directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.text-only-input', [])
  .directive('textOnlyInput', directive)
  .name;
