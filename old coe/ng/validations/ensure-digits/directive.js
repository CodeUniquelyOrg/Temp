//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Digits (validation) directve
//

/* @ngInject */
export default () => {
  return {
    restrict: 'A',
    require: 'ngModel',  // there must be a model attached
    link: (scope, element, attrs, ctrl) => {
      // now limit the input to only digits as the user types
      ctrl.$parsers.push( (inputValue = '') => {
        let transformedInput;
        if (typeof inputValue === 'number') {
          transformedInput = inputValue;
        } else {
          if (typeof inputValue === 'undefined' || inputValue === null) {
            transformedInput = '';
          } else {
            transformedInput = inputValue.replace(/[^0-9]/g, '');
          }
        }
        if (transformedInput!=inputValue) {
          ctrl.$setViewValue(transformedInput);
          ctrl.$render();
        }
        return transformedInput;
      });
    }
  };
};
