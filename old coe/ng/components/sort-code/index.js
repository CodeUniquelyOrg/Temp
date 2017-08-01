//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Sort Code directive
//
import angular from 'angular';

// supporting services
import sortCodeFormatterService from 'services/sortcode.service';
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// styling
import 'style/sort-code.scss';

export default angular.module('myApp.sort-code', [sortCodeFormatterService, utilsService])
  .directive('sortCode', directive)
  .directive('sortCodeProxy', attributeDirective)
  .name;
