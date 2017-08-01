//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Spinner directive
//
import spinnerImg from 'img/preloader.gif';
import template from './template.html';

/* @ngInject */
export default function($rootScope) {
  return {
    restrict: 'E',
    template: template,
    link: function(scope) {
      scope.img = spinnerImg;
      scope.start =  function() {
        $rootScope.spinner = true;
      };
      scope.stop =  function() {
        $rootScope.spinner = false;
      };
    }
  };
}
