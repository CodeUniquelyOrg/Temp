//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Validate Sort Code (validation) directve
//
import angular from 'angular';

/*
  return {
    priority: -1000,
    require: 'ngModel',
    link: function (scope, element, attrs, ngModel) {
      ngModel.$validators.integer = function (modelValue, viewValue) {
        if (REGEX.test(viewValue)) {
          return true;
        }
        return false;
      };
    }
  };
*/

/* @ngInject */
export default () => {

  return {
    priority: -1000,
    require: 'ngModel',
    link: function (scope, elem, attrs, ngModel) {

      ngModel.$render = function () {
        angular.extend(scope.$eval(attrs.validateSortCode), ngModel.$viewValue);
      };

      scope.$watch(attrs.validateSortCode, function (viewValue) {
        ngModel.$setViewValue(viewValue);
      }, true);

      ngModel.$formatters.push(function (modelValue) {
        if (!modelValue) {
          return;
        }
        let parts = String(modelValue).split('-');
        return {
          v1: parts[0],
          v2: parts[1],
          v3: parts[2]
        };
      });

      ngModel.$parsers.unshift(function (viewValue) {
        let isValid = false;
        let modelValue = '';
        if (viewValue) {
          modelValue = [viewValue.v1, viewValue.v2, viewValue.v3].join('-');
          if ('--' === modelValue) {
            modelValue = '';
          } else if ( modelValue.length === 8 ) {
            isValid = true;
          }
        }
        ngModel.$setValidity('validateSortCode', isValid);
        // ngModel.$setValidity('sortcode', isValid);
        return modelValue;
      });
    }
  };
};
