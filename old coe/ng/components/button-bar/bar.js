//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Button Bar directive
//

import template from './bar.html';

/* @ngInject */
export default function() {
  // function bindFunctions(/* scope */) {
  // }
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    // scope: {},
    template: template,
    // link: function(scope) {
    //   bindFunctions(scope);
    // }
  };
}
