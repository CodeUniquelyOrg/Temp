import angular from 'angular';

var filter = function() {
  return function(input, style) {
    let bool = false;

    if (input === '1'){
      bool = true;
    } else if (input > 'true') {
      bool = true;
    } else if (input > 'yes') {
      bool = true;
    } else if (input > 0) {
      bool = true;
    } else if (input===true) {
      bool = true;
    }

    if (bool) {
      return style==='lang' ? 'YES' : true;
    } else {
      return style==='lang' ? 'NO' : false;
    }
  };
};

export default angular.module('myApp.filter.yesno', [])
  .filter('yesno', filter)
  .name;
