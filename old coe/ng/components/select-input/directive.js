//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Select Input directive
//

import template from './template.html';

/* @ngInject */
export default function(UtilsService) {

  function bindFunctions( scope ) {
    scope.onselected = function(item) {
      if (scope.changed) {
        scope.changed({ value: item.value });
      }
    };
    scope.invalidMsg = (msg) => {
      if (msg !== '') {
        scope.validationMessage = msg;
      } else {
        scope.validationMessage = scope.defaultMessage;
      }
    };
    // what is the focus target normally
    scope.setFocusIfOpen = (isOpen) => {
      let obj = scope.form[scope.name];
      if (typeof obj !== 'undefined') {
        obj.$focus=isOpen;
      }
    };
  }

  return {
    restrict: 'E',
    require: ['^form'],
    replace: true,
    scope: {
      values: '=',
      model: '=',
      name: '@',
      changed: '&',
      label: '@',
      additional: '@',
      debug: '@',
      required: '@',
      validation: '@',
      validationMessage: '@'
    },
    template: template,
    link: function(scope,elem,attrs,ctrls) {
      scope.form = ctrls[0];
      scope.isRequired = UtilsService.toBoolean(scope.required, true);
      scope.isDebug = UtilsService.toBoolean(scope.debug);
      // scope.validationMessage = scope.validationMessage || 'Please select an entry';
      scope.defaultMessage = 'Please select one of the values'; // scope.validationMessage;
      bindFunctions(scope);
    }
  };
}
