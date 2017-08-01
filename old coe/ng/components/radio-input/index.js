//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Radio Input directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// dependencies

// styling
import 'style/radio-input.scss';

export default angular.module('myApp.radio-input', [utilsService])
  .directive('radioInput', directive)
  .directive('radioProxy', attributeDirective)
  .name;
