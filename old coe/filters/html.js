import angular from 'angular';

var filter = function($sce) {
  return function(thingToParse) {
    if ( typeof thingToParse === 'string' ) {
      return $sce.trustAsHtml(thingToParse);
    } else {
      return thingToParse;
    }
  };
};

export default angular.module('myApp.filter.html', [])
  .filter('html', filter)
  .name;
