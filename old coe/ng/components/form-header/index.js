//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Form Header directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

// spacer styling
import 'style/form-header.scss';

export default angular.module('myApp.form-header', [])
  .directive('formHeader', directive)
  .name;
