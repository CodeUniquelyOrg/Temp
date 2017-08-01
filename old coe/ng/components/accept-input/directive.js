//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Accept Input directive
//
import template from './template.html';
import controller from './controller';

/* @ngInject */
export default function() {

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
