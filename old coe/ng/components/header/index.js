//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Header directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

// styling
import 'style/header.scss';

export default angular.module('myApp.header', [])
  .directive('header', directive)
  .name;
