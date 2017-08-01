//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Day Month Year Proxy Attribute directive
//
import angular from 'angular';

/* @ngInject */
export default function(DateOfBirthService) {

  return({
    restrict: 'A',
    priority: -1000,
    require: 'ngModel',
    link: function (scope, element, attr, ngModel) {

      // parsers pipeline
      ngModel.$parsers.push(function(viewValue) {
        let result;
        let isValid = false;
        if(typeof viewValue !== 'undefined') {
          result = DateOfBirthService.construct(viewValue.day, viewValue.month, viewValue.year);
          isValid = (result.length === 10);
        }
        // set validity on initial render
        ngModel.$setValidity(scope.name, isValid);
        return result;
      });

      // formatter pipeline
      ngModel.$formatters.push(DateOfBirthService.deconstruct);

      // populate the 'secret/internal' view model
      ngModel.$render = () => {
        scope.vm = angular.copy(ngModel.$viewValue);
      };

      // build the 'internal' watch expression
      scope.$watch('vm', function(newval) {
        ngModel.$setViewValue(newval);
        ngModel.$render(); // also tell the form's model to update
      }, true);
    }
  });
}
