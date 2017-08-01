//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Optional Telephone Input directive
//
import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  function bindFunctions(scope) {
    scope.invalidMsg = (msg) => {
      if (msg !== '') {
        scope.validationMessage = msg;
      } else {
        scope.validationMessage = scope.defaultMessage;
      }
    };
  }

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
      validation: '@',
      validationMessage: '@',
    },
    template: template,
    controller: ($scope) => {
      $scope.initialValidity = true;
    },
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.length = scope.length || 11;
      scope.isRequired = false;
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      scope.defaultMessage = 'Invalid telephone number';
      bindFunctions(scope);
    }
  };
}
