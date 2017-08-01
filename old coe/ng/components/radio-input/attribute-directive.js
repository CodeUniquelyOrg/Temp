//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Radio Proxy Attribute directive
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

        // toggle the 'internal' $touched value
        this.$touched = typeof this.$touched !== 'undefined';

        // set the touched value for the checkboxes
        scope.$parent.form[scope.name].$touched = this.$touched;
        scope.$parent.form[scope.name].$untouched = !this.$touched;

        return result;
      });

      // formatter pipeline
      ngModel.$formatters.push(function(obj){
        return obj;
      });

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
