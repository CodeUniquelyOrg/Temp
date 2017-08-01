//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Checkbox Embed directive
//
import template from './template.html';

/* @ngInject */
export default function(/* UtilsService */) {

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    scope: {
      model: '=',
      name: '@',
      label: '@',
      disabled: '=',
    },
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      // scope.isDisabled = UtilsService.toBoolean(scope.disabled, false);
      scope.$watch('disabled', (current) => {
        scope.isDisabled = current ? current : false;
      });
    }
  };
}
