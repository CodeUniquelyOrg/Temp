//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Optional Text Input  directive
//
import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  return {
    restrict: 'E',
    replace: true,
    require: ['^form'],
    scope: {
      model: '=',
      name: '@',
      label: '@',
      additional: '@',
      debug: '@',
      length: '@',
    },
    template: template,
    controller: ($scope) => {
      $scope.initialValidity = true;
    },
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.length = scope.length || 50;
      scope.isRequired = false;
      scope.isDebug = UtilsService.toBoolean(scope.debug);
    }
  };
}
