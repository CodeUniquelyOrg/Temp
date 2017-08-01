//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Month Year directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';
import monthYearFormatterService from 'services/monthyear.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// styling
import 'style/month-year.scss';

export default angular.module('myApp.month-year', [monthYearFormatterService, utilsService])
  .directive('monthYear', directive)
  .directive('monthYearProxy', attributeDirective)
  .name;
