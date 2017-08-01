//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Show Errors (validation) directve
//
const REGEX = /^\-?\d+$/;

/* @ngInject */
export default () => {
  return {
    require: 'ngModel',
    link: function (scope, element, attrs, ctrl) {
      ctrl.$validators.integer = function (modelValue, viewValue) {
        if (REGEX.test(viewValue)) {
          return true;
        }
        return false;
      };
    }
  };
};
