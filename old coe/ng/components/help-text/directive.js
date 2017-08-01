//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Help-text directive
//

import template from './template.html';

/* @ngInject */
export default function() {
  function bindFunctions(scope) {
    scope.onClicked = () => {
      scope.isShown = !scope.isShown;
    };
  }

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.isShown = false;
      bindFunctions(scope);
    }
  };
}
