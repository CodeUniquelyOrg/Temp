//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Accept Input directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

// spacer styling
import 'style/accept-input.scss';

export default angular.module('myApp.accept-input', [utilsService])
  .directive('acceptInput', directive)
  .name;
