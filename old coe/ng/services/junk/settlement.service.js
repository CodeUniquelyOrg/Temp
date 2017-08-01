//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Settlement service
//
import angular from 'angular';

//
// Settlement types supported
//
const settlements = [
  {
    id: 1,
    title: 'Standard Settlement',
    short: 'Standard Settlement',
    description: 'Funds received in 3-5 working days',
    costs: [
      {
        title: 'Cost',
        recurring: true,
        price: 0
      }
    ]
  }, {
    id: 2,
    title: 'Faster Settlement',
    short: 'Faster Settlement',
    description: 'Pay a bit extra and received funds by the next working day**',
    // costs: [
    //   {
    //     title: 'Monthly Charge',
    //     recurring: false,
    //     price: 30
    //   }, {
    //     title: 'Joining Fee',
    //     recurring: true,
    //     price: 0
    //   }
    // ]
  }
];

class service {

  /* @ngInject */
  constructor(ModelService) {
    this.ModelService = ModelService;
    this.settlements = settlements;
  }

  get() {
    return this.settlements;
  }

  getById() {
    if (this.ModelService.model.fasterSettlement === '1') {
      return settlements[1];
    }
    return settlements[0];
    /*
    let found;
    this.settlements.forEach(item => {
      if (item.id===this.ModelService.model.settlement) {
        found = item;
      }
    });
    return found;
    */
  }

  // getByTitle(title) {
  //   let found;
  //   this.settlements.forEach(item => {
  //     if (item.title===title) {
  //       found = item;
  //     }
  //   });
  //   return found;
  // }
}

export default angular.module('wcy.services.settlement', [])
  .service('SettlementService', service)
  .name;
