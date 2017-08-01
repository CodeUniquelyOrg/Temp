//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Select Input directive
//

import angular from 'angular';
import uiSelect from 'ui-select';

import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

// dependencies

// styling
import 'style/select-input.scss';

export default angular.module('myApp.select-input', [uiSelect, utilsService])
  .directive('selectInput', directive)
  .name;
