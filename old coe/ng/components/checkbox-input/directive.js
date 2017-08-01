//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Checkbox Input directive
//
import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  function bindFunctions(scope) {
    scope.invalidMsg = (msg) => {
      if (msg !== '') {
        scope.validationMessage = msg;
      } else {
        scope.validationMessage = scope.defaultMessage;
      }
    };
  }

  return {
    restrict: 'E',
    require: ['^form'],
    replace: true,
    scope: {
      label: '@',
      additional: '@',
      debug: '@',
      required: '@',
      model: '=',
      name: '@',
      validation: '@',
      validationMessage: '@',
      values: '=',
    },
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.values = scope.values || [];
      scope.model = scope.model || {};
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      scope.validationMessage = scope.validationMessage || 'Please select at least one entry';
      scope.defaultMessage = scope.validationMessage;
      bindFunctions(scope);
    }
  };
}
