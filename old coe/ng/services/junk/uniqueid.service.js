//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Unique Id service
//
import angular from 'angular';

let nextId;

class service {
  /* @ngInject */
  constructor() {
    nextId = 0;
  }
  next() {
    return ++nextId;
  }
}

export default angular.module('myApp.services.uniqueid', [])
  .service('UniqueIdService', service)
  .name;
