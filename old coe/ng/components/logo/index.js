//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Logo directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

// styling
import 'style/logo.scss';

export default angular.module('myApp.logo', [])
  .directive('logo', directive)
  .name;
