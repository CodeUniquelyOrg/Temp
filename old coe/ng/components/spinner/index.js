//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Spinner directive
//
import angular from 'angular';
import directive from './directive';

// styling
import 'style/spinner.scss';

export default angular.module('myApp.spinner', [])
  .directive('spinner', directive)
  .name;
