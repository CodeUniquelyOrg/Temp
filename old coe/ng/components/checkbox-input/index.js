//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Checkbox Input directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// spacer styling
import 'style/checkbox-input.scss';

export default angular.module('myApp.checkbox-input', [utilsService])
  .directive('checkboxInput', directive)
  .directive('checkboxProxy', attributeDirective)
  .name;
