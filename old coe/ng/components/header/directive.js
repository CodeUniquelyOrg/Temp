//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Header directive
//
import template from './template.html';

/* @ngInject */
export default function() {
  return {
    restrict: 'E',
    replace: true,
    template: template,
  };
}
