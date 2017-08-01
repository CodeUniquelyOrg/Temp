//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Sort Code directive
//
import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    scope: {
      model: '=',
      name: '@',
      label: '@',
      additional: '@',
      debug: '@',
      required: '@',
      validation: '@',
      validationMessage: '@'
    },
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.validation = scope.validation || 'sortCode';
      scope.validationMessage = scope.validationMessage || 'Please enter a valid sort code';
    }
  };
}