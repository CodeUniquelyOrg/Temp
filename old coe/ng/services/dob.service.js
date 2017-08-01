//
// Written my Steve Saxton <steves@codeuniquely.co.uk
// Date of Birth Formatter service
//
import angular from 'angular';

// const RegEx = /^(0[1-9]|1[012])\/((?:18|19|20)[0-9]{2})$/;
// const RegEx = /^(((0[1-9]|[12][0-9]|30)[/]?(0[13-9]|1[012])|31[/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
// const RegEx = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;

// Expecting date to be held internally in ISO (YYYY-MM-DD) format
const RegEx = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/;
const empty = '';

class service {

  /* @ngInject */
  constructor() {
  }

  construct(day, month, year) {
    return `${year || empty}-${month || empty}-${day || empty}`;
  }

  deconstruct(str) {
    let result, day, month, year;
    result = RegEx.exec(str);
    if( result ) {
      day = result[3];
      month = result[2];
      year = result[1];
    }
    return { day, month, year };
  }
}

export default angular.module('myApp.services.dob', [])
  .service('DateOfBirthService', service)
  .name;
