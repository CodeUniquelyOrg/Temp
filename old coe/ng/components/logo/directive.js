//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Logo directive
//

import template from './template.html';

/* @ngInject */
export default function() {
  return {
    restrict: 'E',
    replace: true,
    template: template
  };
}
