//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Spacer directive
//

import template from './template.html';

/* @ngInject */
export default function(UtilsService) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      extended: '='
    },
    template: template,
    link: function(scope) {
      scope.isExtended = UtilsService.toBoolean(scope.extended);
    }
  };
}
