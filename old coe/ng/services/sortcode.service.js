//
// Written my Steve Saxton <steves@codeuniquely.co.uk
// Sort Code Formatter service
//
import angular from 'angular';

// const RE = /([0-9]+{2})-([0-9]+)-([0-9]+)/;
const RegEx = /^(\d{2})-(\d{2})-(\d{2})$/;
const empty = '';

class service {

  /* @ngInject */
  constructor() {
  }

  construct(part1, part2, part3) {
    return `${part1 || empty}-${part2 || empty}-${ part3 || empty}`;
  }

  deconstruct(str) {
    let result, part1, part2,part3;
    result = RegEx.exec(str);
    if( result ) {
      part1 = result[1];
      part2 = result[2];
      part3 = result[3];
      // part1 = parseInt(result[1],10);
      // part2 = parseInt(result[2],10);
      // part3 = parseInt(result[3],10);
    }
    return { part1, part2, part3 };
  }
}

export default angular.module('myApp.services.sortcode', [])
  .service('SortCodeFormatterService', service)
  .name;
