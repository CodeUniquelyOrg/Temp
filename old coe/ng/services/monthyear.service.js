//
// Written my Steve Saxton <steves@codeuniquely.co.uk
// Month Year Formatter service
//
import angular from 'angular';

// month: /^(0[1-9]|1[012])$/,
// year: /^(?:(?:18|19|20)[0-9]{2})/,

// const RegEx = /^(0[1-9]|1[012])\/(?:(?:19|20)[0-9]{2})$/;
// const RegEx = /^(0[1-9]|1[012])\/((?:18|19|20)[0-9]{2})$/;
const RegEx = /^([0-9]{2})\/([0-9]{4})$/;
const empty = '';

class service {

  /* @ngInject */
  constructor() {
  }

  construct(month, year) {
    return `${month || empty}/${year || empty}`;
  }

  deconstruct(str) {
    let result, month, year;
    result = RegEx.exec(str);
    if( result ) {
      month = result[1];
      year = result[2];
    }
    return { month, year };
  }
}

export default angular.module('myApp.services.monthyear', [])
  .service('MonthYearFormatterService', service)
  .name;
