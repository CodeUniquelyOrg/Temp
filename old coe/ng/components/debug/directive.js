//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Debug directive
//

import template from './template.html';

/* @ngInject */
export default function() {
  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
    }
  };
}
