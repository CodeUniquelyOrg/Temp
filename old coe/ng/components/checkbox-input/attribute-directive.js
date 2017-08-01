//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Checkbox Proxy Attribute directive
//
import angular from 'angular';

/* @ngInject */
export default function() {

  return({
    restrict: 'A',
    priority: -1000,
    require: 'ngModel',
    link: function (scope, element, attr, ngModel) {

      this.$touched = undefined;

      // parsers pipeline
      ngModel.$parsers.push(function(viewValue) {
        let result;
        if(typeof viewValue !== 'undefined') {
          result = viewValue;
        }

        // $touched is false on initial push, otherwise 'true'
        this.$touched = typeof this.$touched !== 'undefined';

        // set the touched value for the checkboxes
        scope.form[scope.name].$touched = this.$touched;
        scope.form[scope.name].$untouched = !this.$touched;
        // scope.$parent.form[scope.name].$touched = this.$touched;
        return result;
      });

      // formatter pipeline
      ngModel.$formatters.push( (obj) => {
        return obj;
      });

      // populate the 'secret/internal' view model
      ngModel.$render = () => {
        scope.vm = angular.copy(ngModel.$viewValue);
      };

      // build the 'internal' watch expression
      scope.$watch('vm', (newval) => {
        ngModel.$setViewValue(newval); // set the 'hidden' input
        ngModel.$render(); // also tell the form's model to update
      }, true);
    }

  });
}
