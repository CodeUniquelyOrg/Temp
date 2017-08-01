  //
//
// Application Name:   CardNet
// Application Type:   API
// API Key:            kj9dPtsgrujwN30xnn9GOrpXo8_Qdfg5YCaSzU4v
// Registered on:      2017-07-04T07:01:49
//
// --- SEARCHES ---
//
// GET /search                         Search Companies House
// GET /search/companies               Search companies
// GET /search/officers                Search company officers
// GET /search/disqualified-officers   Search disqualified officers
//
import angular from 'angular';
import sharedConfig from 'src/config';

const searchAPI = `${sharedConfig.server.apiRoot}/company`;   // 'http://localhost:8000/api/v1/company';
const restAPI = `${sharedConfig.server.apiRoot}/company/:id`; // 'http://localhost:8000/api/v1/company/:id';

class service {

  /* @ngInject */
  constructor($resource) {
    this.searchApi = $resource(searchAPI, {}, {});
    this.detailApi = $resource(`${restAPI}/detail`, {}, {});
    this.addressApi = $resource(`${restAPI}/address`, {}, {});
    this.officersApi = $resource(`${restAPI}/officers`, {}, {});
    // disqualifiedApi = $resource(restAPI + '/disqualified-officers', {}, {});
  }

  search(params) {
    return this.searchApi.get({ params: params }).$promise;
  }

  // https://developer.companieshouse.gov.uk/api/docs/search-overview/CompanySearch-resource.html
  getById(id) {
    return this.detailApi.get({ id: id }).$promise;
  }

  // GET /company/:id/registered-office-address
  getAddress(id) {
    return this.addressApi.get({ id: id }).$promise;
  }

  // GET /company/:id/officers?items_per_page=100&register_type=directors&register_view=true&start_index=0&order_by=surname HTTP/1.1
  getOfficers(id, type) {
    return this.officersApi.get({ id: id, type:type }).$promise;
  }

  getDisqualifed(/* id */) {
    // return disqualifiedApi.get({ id: id }).$promise;
  }
}

export default angular.module('wcy.services.companies-house', [])
  .service('CompaniesHouseService', service)
  .name;
