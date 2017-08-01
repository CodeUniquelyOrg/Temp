//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Decision service
//
import angular from 'angular';

// placeholder
// let apiService = null;

const credit = {
  4000: { 10:1.8, 20:1.75, 50:1.7, 75:1.7, 100:1.7, 500:1.65, 1000:1.65 },
  20000: { 10:1.2, 20:1.1, 50:1., 75:1., 100:1.0, 500:0.1, 1000:1.0 },
  40000: { 10:1.1, 20:1., 50:0.95, 75:0.95, 100:0.95, 500:0.9, 1000:0.9 },
  70000: { 10:1.05, 20:0.95, 50:0.9, 75:0.9, 100:0.9, 500:0.85, 1000:0.85 },
  225000: { 10:1., 20:0.92, 50:0.85, 75:0.85, 100:0.85, 500:0.8, 1000:0.8 },
  500000: { 10:1., 20:0.9, 50:0.85, 75:0.85, 100:0.85, 500:0.8, 1000:0.8 }
};

const debit = {
  4000: { 10:1.7, 20:1.6, 50:1.5, 75:1.5, 100:1.5, 500:1.5, 1000:1.5 },
  20000: { 10:0.9, 20:0.75, 50:0.7, 75:0.7, 100:0.7, 500:0.7, 1000:0.7 },
  40000: { 10:0.8, 20:0.7, 50:0.6, 75:0.6, 100:0.6, 500:0.6, 1000:0.6 },
  70000: { 10:0.75, 20:0.65, 50:0.55, 75:0.55, 100:0.55, 500:0.55, 1000:0.55 },
  225000: { 10:0.7, 20:0.6, 50:0.525, 75:0.525, 100:0.525, 500:0.5, 1000:0.5 },
  500000: { 10:0.68, 20:0.58, 50:0.5, 75:0.5, 100:0.5, 500:0.5, 1000:0.5 }
};

const com = {
  4000: { 10:2.4, 20:2.4, 50:2.4, 75:2.4, 100:2.4, 500:2.4, 1000:2.4 },
  20000: { 10:2.3, 20:2.3, 50:2.3, 75:2.3, 100:2.3, 500:2.3, 1000:2.3 },
  40000: { 10:2.2, 20:2.2, 50:2.2, 75:2.2, 100:2.2, 500:2.2, 1000:2.2 },
  70000: { 10:2.15, 20:2.15, 50:2.15, 75:2.15, 100:2.15, 500:2.15, 1000:2.15 },
  225000: { 10:2.15, 20:2.1, 50:2.1, 75:2.1, 100:2.1, 500:2.1, 1000:2.1 },
  500000: { 10:2.15, 20:2.1, 50:2.1, 75:2.1, 100:2.1, 500:2.1, 1000:2.1 }
};

const vbus = {
  4000: { 10:0.8, 20:0.75, 50:0.7, 75:0.7, 100:0.7, 500:0.6, 1000:0.5 },
  20000: { 10:0.7, 20:0.6, 50:0.55, 75:0.5, 100:0.5, 500:0.4, 1000:0.35 },
  40000: { 10:0.6, 20:0.55, 50:0.5, 75:0.5, 100:0.5, 500:0.35, 1000:0.3 },
  70000: { 10:0.58, 20:0.5, 50:0.5, 75:0.5, 100:0.5, 500:0.3, 1000:0.28 },
  225000: { 10:0.57, 20:0.5, 50:0.5, 75:0.5, 100:0.5, 500:0.3, 1000:0.28 },
  500000: { 10:0.57, 20:0.5, 50:0.5, 75:0.5, 100:0.5, 500:0.3, 1000:0.28 }
};

class service {

  /* @ngInject */
  // constructor(/* $resource, ModelService */) {
  //   const API = ConstantsService.API;
  //   apiService = $resource(API.url + '/decision', {}, {
  //     'save': { method:'POST', isArray:true }
  //   });
  // }
  constructor(ModelService) {
    this.ModelService = ModelService;
  }

  limitAtv(value) {
    if (typeof value === 'undefined' || value < 15) {
      return 10;
    } else if (value<30) {
      return 20;
    } else if (value<65) {
      return 50;
    } else if (value<85) {
      return 75;
    } else if (value<250) {
      return 100;
    } else if (value<500) {
      return 500;
    } else {
      return 1000;
    }
  }

  limitTurnover(value) {
    if (typeof value === 'undefined' || value < 10000) {
      return 4000;
    } else if (value<30000) {
      return 20000;
    } else if (value<50000) {
      return 40000;
    } else if (value<100000) {
      return 70000;
    } else if (value<500000) {
      return 225000;
    } else {
      return 500000;
    }
  }

  // Speardsheet just said Turnover, its assumed that you need the Annual Card Turnover
  // as the ATV is the card 'Average Transacion Value'. and would tie in with the above
  lookup() {
    let turnover = this.limitTurnover(this.annualTurnoverCard);
    let atv = this.limitAtv(this.atv);
    return {
      auth:   0.01,  // 1 pence per Txn
      credit: credit[turnover][atv],
      debit:  debit[turnover][atv],
      com:    com[turnover][atv],
      vbus:   vbus[turnover][atv],
    };
  }

  fixed() {
    return {
      auth:   0.00,   // 0 pence per Txn
      credit: 1.250,
      debit:  1.250,
      com:    1.250,
      vbus:   1.250
    };
  }

  get() { // turnover, atv) {
    const model = this.ModelService.model;
    if (model.annualTurnover && model.avgTransValue) {
      this.turnover = model.annualTurnover;
      this.atv = model.avgTransValue;
    }
    return [ this.lookup(), this.fixed() ];
  }
}

export default angular.module('wcy.services.decision', [])
  .service('DecisionService', service)
  .name;
