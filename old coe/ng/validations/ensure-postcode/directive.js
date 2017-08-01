//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Ensure Postcode (validation) directve
//

/* @ngInject */
export default () => {
  return {
    restrict: 'A',
    require: 'ngModel',  // there must be a model attached
    link: (scope, element, attrs, ctrl) => {
      // limit the input to be postcode format as the user types
      ctrl.$parsers.push( (inputValue) => {
        // let transformedInput = inputValue.replace(/((([A-PR-UWYZ])([0-9][0-9A-HJKS-UW]?))|(([A-PR-UWYZ][A-HK-Y])([0-9][0-9ABEHMNPRV-Y]?))\s{0,2}(([0-9])([ABD-HJLNP-UW-Z])([ABD-HJLNP-UW-Z])))|(((GI)(R))\s{0,2}((0)(A)(A)))+/i, '');
        let transformedInput = inputValue.replace(/[^a-zA-Z0-9 ]+/g, '');
        if (transformedInput!=inputValue) {
          ctrl.$setViewValue(transformedInput);
          ctrl.$render();
        }
        return transformedInput;
      });
    }
  };
};
