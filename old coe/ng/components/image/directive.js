//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Image directive
//

import template from './template.html';

/* @ngInject */
export default function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      source:'@',
      title: '@',
    },
    template: template,
    // controller:controller,
    link: function(scope) {
      scope.getSrcPath = function() {
        return `img/${scope.source}`;
      };
    }
  };
}
