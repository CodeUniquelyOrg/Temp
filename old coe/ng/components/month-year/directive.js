//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Month Year directive
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
    controller: controller,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
    }
  };
}