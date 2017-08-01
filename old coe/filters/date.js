import angular from 'angular';

var filter = function($filter) {
  return function(input) {
    if( input == null ) {
      return '';
    }
    // use the filter: 'dd MMM yyyy, HH:mm:ss'
    return $filter('date')(new Date(input), 'dd MMM yyyy, HH:mm:ss');
  };
};

export default angular.module('myApp.filter.date', [])
  .filter('datetime', filter)
  .name;
