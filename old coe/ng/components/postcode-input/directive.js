//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Postcode Input directive
//
import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    scope: {
      label: '@',
      additional: '@',
      debug: '@',
      required: '@',
      model: '=',
      name: '@',
      length: '@',
      validation: '@',
      validationMessage: '@'
    },
    template: template,
    link: function(scope, element, attrs, ctrls) {
      scope.form = ctrls[0];
      scope.length = scope.length || 8;  // 'AANN NAA'
      scope.validation = scope.validation || 'postCode';
      scope.validationMessage = scope.validationMessage || 'Please enter a valid postcode';
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.isDebug = UtilsService.toBoolean(scope.debug);
    }
  };
}
