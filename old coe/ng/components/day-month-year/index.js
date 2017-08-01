//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Day Month Year directive
//
import angular from 'angular';

// supporting services
import dateOfBirthService from 'services/dob.service';
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// dependencies
import ensureDigits from 'validations/ensure-digits';

// styling
import 'style/day-month-year.scss';

export default angular.module('myApp.day-month-year', [ensureDigits, dateOfBirthService, utilsService])
  .directive('dayMonthYear', directive)
  .directive('dayMonthYearProxy', attributeDirective)
  .name;
