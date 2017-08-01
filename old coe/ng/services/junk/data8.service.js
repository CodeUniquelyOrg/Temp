import angular from 'angular';
import sharedConfig from 'src/config';

const searchAPI = `${sharedConfig.server.apiRoot}/address/lookup`; // 'http://localhost:8000/api/v1/address/lookup';

class service {

  /* @ngInject */
  constructor($resource) {
    this.addressApi = $resource(searchAPI, {}, {});
  }

  lookupAddress(line1, postcode) {
    return this.addressApi.get({ line1, postcode }).$promise;
  }
}

export default angular.module('wcy.services.data8', [])
  .service('Data8Service', service)
  .name;
