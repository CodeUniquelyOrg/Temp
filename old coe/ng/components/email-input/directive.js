//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Email Input  directive
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
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.length = scope.length || 50;
      scope.validation = scope.validation || 'noop';
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      scope.invalidMsg = (msg) => {
        scope.validationMessage = msg;
      };
    }
  };
}
