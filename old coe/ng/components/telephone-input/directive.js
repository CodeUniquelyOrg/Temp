//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Telephone Input directive
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
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.length = scope.length || 11;
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      // scope.validationMessage = scope.validationMessage || 'Invalid telephone number';
      scope.defaultMessage = 'Invalid telephone number';
      bindFunctions(scope);
    }
  };
}
