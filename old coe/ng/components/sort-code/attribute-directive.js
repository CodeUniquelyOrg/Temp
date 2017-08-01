//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Sort Code Proxy Attribute directive
//
import angular from 'angular';

/* @ngInject */
export default function(SortCodeFormatterService) {

  return({
    restrict: 'A',
    priority: -1000,
    require: 'ngModel',
    link: function (scope, element, attr, ngModel) {

      this.$touched = undefined;

      // parsers pipeline
      ngModel.$parsers.push(function(viewValue) {
        let result;
        let isValid = false;
        if(typeof viewValue !== 'undefined') {
          result = SortCodeFormatterService.construct(viewValue.part1, viewValue.part2, viewValue.part3);
          isValid = ( result.length === 8 );
        }

        // toggle the 'internal' $touched value
        this.$touched = typeof this.$touched !== 'undefined';

        // set the touched value for the checkboxes
        scope.form[scope.name].$touched = this.$touched;
        scope.form[scope.name].$untouched = !this.$touched;

        // set validity on initial render
        ngModel.$setValidity(scope.name, isValid);
        return result;
      });

      // formatter pipeline
      ngModel.$formatters.push(SortCodeFormatterService.deconstruct);

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
