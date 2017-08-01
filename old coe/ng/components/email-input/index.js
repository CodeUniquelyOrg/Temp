//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Email Input directive
//
import angular from 'angular';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

// dependencies

// styling
import 'style/email-input.scss';

export default angular.module('myApp.email-input', [utilsService])
  .directive('emailInput', directive)
  .name;
