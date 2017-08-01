//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Constants service
//
import angular from 'angular';
import sharedConfig from 'src/config';

class service {

  /* @ngInject */
  constructor() {

    //  load the options
    this.options = sharedConfig.options;

    // pull in branding information
    this.brand = 'Wheelright';
  }
}

export default angular.module('myApp.services.constants', [])
  .service('ConstantsService', service)
  .name;
