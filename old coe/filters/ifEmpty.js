import angular from 'angular';

var filter = function() {
  return function(input, defaultValue) {
    if (angular.isUndefined(input) || input === null || input === '') {
      return defaultValue;
    } else {
      return input;
    }
  };
};

export default angular.module('myApp.filter.ifEmpty', [])
  .filter('ifEmpty', filter)
  .name;
