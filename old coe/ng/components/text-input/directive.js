//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Text Input  directive
//
import template from './template.html';
import controller from './controller';

/* @ngInject */
export default function(/* UtilsService */) {

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    scope: {
      label: '@',
      additional: '@',
      debug: '@',
      help: '@',
      required: '@',
      model: '=',
      name: '@',
      length: '@',
      validation: '@',
      validationMessage: '@',
      changed: '&'
    },
    template: template,
    controller:controller,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      // scope.length = scope.length || 50;
      // scope.validation = scope.validation || 'noop';
      // scope.isRequired = UtilsService.toBoolean(scope.required, true);
      // scope.isDebug = UtilsService.toBoolean(scope.debug);
      // scope.invalidMsg = (msg) => {
      //   scope.validationMessage = msg;
      // };
      scope.onchanged = () => {
        if (scope.changed) {
          scope.changed();
        }
      };
    }
  };
}
