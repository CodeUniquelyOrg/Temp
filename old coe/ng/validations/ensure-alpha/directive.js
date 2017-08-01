//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Alpha Only (validation) directive
//

/* @ngInject */
export default () => {
  return {
    restrict: 'A',
    require: 'ngModel',  // there must be a model attached
    link: (scope, element, attrs, ctrl) => {
      // now limit the input to only Alpha as the user types
      ctrl.$parsers.push( (inputValue) => {
        let transformedInput = inputValue.replace(/[^a-zA-Z\- ]/g, '');
        if (transformedInput!=inputValue) {
          ctrl.$setViewValue(transformedInput);
          ctrl.$render();
        }
        return transformedInput;
      });
    }
  };
};
