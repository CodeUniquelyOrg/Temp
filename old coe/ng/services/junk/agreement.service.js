//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Agreement service
//
import angular from 'angular';

// import { bankWithTypes } from 'code/pages/constants';

// There are TWO Possible agrrements, right now, second one is limited to Lloyds / Bank of Scotland customers
const agreements = [
  {
    id: 1,
    title: 'Cardnet Agreement',
    short: 'Cardnet Agreement',
    description: 'Agreement over 48 months with option to defer charges for first 3 months (extends contract to 51 months)',
    notes: [
      'With the 48 Month Agreement you can optionally defer charges for first 3 months (extends contract to 51 months)'
    ],
    costs: [
      {
        title: 'Minimum Monthly Charge',
        recurring: true,
        price: 15
      }, {
        title: 'Joining Fee',
        recurring: false,
        price: 50
      }
    ]
  },
  /*
  {
    id: 2,
    title: '18 Month Agreement',
    short: '18 Month',
    description: 'Agreement over 18 months (additional offering for existing Lloyds customers)',
    costs: [
      {
        title: 'Minimum Monthly Charge',
        recurring: true,
        price: 15
      }, {
        title: 'Joining Fee',
        recurring: false,
        price: 0
      }
    ]
  }
  */
];

class service {

  /* @ngInject */
  constructor(ModelService, UtilsService, DecisionService) {

    this.ModelService = ModelService;
    this.UtilsService = UtilsService;
    this.DecisionService = DecisionService;

    this.agreements = agreements;
  }

  // RENAME to getAll()
  get() {
    this.decisions = this.DecisionService.get();

    this.agreements = [];
    this.agreements.push( angular.extend({}, agreements[0], this.decisions[0]) );

    // const match = this.UtilsService.lookupSelection(bankWithTypes, this.ModelService.model.banking);

    // Add second if Lloyds / Bank of Scotland customers
    // if (match === 'Lloyds' || match === 'Bank of Scotland') {
    //   this.agreements.push( angular.extend({}, agreements[1], this.decisions[1]) );
    // }

    return this.agreements;
  }

  // RENAME to get()
  getById(/* id */) {
    let found;
    this.agreements.forEach(item => {
      if (item.id === this.ModelService.model.agreement) {
        found = item;
      }
    });
    return found;
  }

  getByTitle(title) {
    let found;
    this.agreements.forEach(item => {
      if (item.title===title) {
        found = item;
      }
    });
    return found;
  }
}

export default angular.module('wcy.services.agreement', [])
  .service('AgreementService', service)
  .name;
