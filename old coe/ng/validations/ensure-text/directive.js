//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Text Only (validation) directve
//

/* @ngInject */
export default () => {
  return {
    restrict: 'A',
    require: 'ngModel',  // there must be a model attached
    link: (scope, element, attrs, ctrl) => {
      // now limit the input to only useful text input as the user types
      ctrl.$parsers.push( (inputValue) => {
        let transformedInput = inputValue.replace(/[^/a-zA-Z0-9 _.,?!:;'""'()&%#@\-\+]+/g, '');
        if (transformedInput!=inputValue) {
          ctrl.$setViewValue(transformedInput);
          ctrl.$render();
        }
        return transformedInput;
      });
    }
  };
};
