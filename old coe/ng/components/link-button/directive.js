//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Link Button directive
//

import template from './template.html';
import controller from './controller';

/* @ngInject */
export default function() {

  return {
    restrict: 'E',
    replace: true,
    scope: {
      primary:'@',
      secondary:'@',
      tertiary:'@',
      link: '@',
      direction:'@',
      text:'@',
      title: '@',
      disabled: '@'
    },
    template: template,
    controller:controller
  };
}
