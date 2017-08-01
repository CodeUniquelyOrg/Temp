//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Radio Input directive
//

import template from './template.html';
import controller from './controller';

/* @ngInject */
export default function(/* UtilsService */) {

  return {
    restrict: 'E',
    require: ['^form'],
    replace: true,
    scope: {
      label: '@',
      additional: '@',
      debug: '@',
      initial: '@',
      help: '@',
      required: '@',
      model: '=',
      name: '@group',
      validation: '@',
      validationMessage: '@',
      values: '=',
      changed: '&'
    },
    template: template,
    controller: controller,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
    }
  };
}
