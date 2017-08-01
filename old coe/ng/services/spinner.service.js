//
// Written my Steve Saxton <steves@codeuniquely.co.uk
// Spinner (spinning disc) service
//

import angular from 'angular';

class service {

  /* @ngInject */
  constructor($rootScope, $injector, $q) {
    this.$rootScope = $rootScope;
    this.$injector = $injector;
    this.$q = $q;

    // make sure that 'this' has the same meaning in the functions
    this.request = this.request.bind(this);
    this.response = this.response.bind(this);
    this.responseError = this.responseError.bind(this);
  }

  // start request turns on spinning disc
  request(conf) {
    this.$rootScope.throbber = true;
    return conf;
  }

  // end response turns off spinning disc
  response(res) {
    var ref = this.$injector.get('$http');
    if(ref.pendingRequests.length < 1) {
      this.$rootScope.throbber = false;
    }
    return res;
  }

  // error response turns off spinning disc
  responseError(res) {
    var ref = this.$injector.get('$http');
    if(ref.pendingRequests.length < 1) {
      this.$rootScope.throbber = false;
    }
    return this.$q.reject(res);
  }
}

export default angular.module('myApp.services.spinner', [])
  .service('SpinnerService', service)
  .name;
