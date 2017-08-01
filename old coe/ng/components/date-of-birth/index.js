//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Sort Code directive
//
import angular from 'angular';

// supporting services
import dateOfBirthService from 'services/dob.service';
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// styling
import 'style/date-of-birth.scss';

export default angular.module('myApp.date-of-birth', [dateOfBirthService, utilsService])
  .directive('dateOfBirthInput', directive)
  .directive('dateOfBirthProxy', attributeDirective)
  .name;
