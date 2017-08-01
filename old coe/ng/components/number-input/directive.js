//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Number Input directive
//
import template from './template.html';
import controller from './controller';

/* @ngInject */
export default function() {

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
      length: '@',
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
