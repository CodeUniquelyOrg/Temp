//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Form Header directive
//

import template from './template.html';

/* @ngInject */
export default function() {

  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: template,
  };
}
