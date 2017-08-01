//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Number Input directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

// dependencies

// styling
import 'style/number-input.scss';

export default angular.module('myApp.number-input', [utilsService])
  .directive('numberInput', directive)
  .name;
