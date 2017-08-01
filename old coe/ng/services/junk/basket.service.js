//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Shopping Basket service
//
import angular from 'angular';

// basket = [
//   {
//     id: 0,  <== [BASKET ID]
//     type: 'agreement',
//     entry: {
//       id: 0,  <== [ agreement ID from SQL/DB ]
//       title: 'Bespoke - 48 Month Agreement',
//       short: 'Bespoke 48',
//       description: 'Agreement over 48 months with option to defer charges for first 3 months (extends contract to 51 months)',
//       notes: [
//         'Optionally defer charges for first 3 months (extends contract to 51 months)'
//       ],
//       costs: [
//         {
//           title: 'Monthly Charge',
//           recurring: false,
//           price: 30
//         }, {
//           title: 'Joining Fee',
//           recurring: true
//           price: 25
//         }
//       ]
//     }
//   }, {
//     id: 1,
//     type: 'settlement',
//     entry: {
//
//     }
//   }
// ]

class service {

  /* @ngInject */
  constructor(/* $resource, ConstantsService */ ModelService) {
    // const API = ConstantsService.API;
    // apiBasket = $resource(API.url + '/basket', {}, {
    //   'save': { method:'POST' }  // returns an object with an array of basket entries
    // });

    this.ModelService = ModelService;

    // this.basket = ModelService.basket;

    // placeholder for basket items
    // this.items = ModelService.basket; // [];
    // this.ModelService.basket = this.items;  // bind them both ways
  }

  // nextId() {
  //   return this.ModelService.uid;
  // }

  // empty() {
  //   // this.items = [];
  //   this.ModelService.basket = [];
  // }

  // add(type, title, price, recurring=false) {
  // add(type, entry) {
  //   let id = this.nextId();
  //   // this.items.push({ id, type, entry });
  //   this.ModelService.basket.push({ id, type, entry });
  // }

  // replace(type, entry) {
  //   let found;
  //   this.ModelService.basket.forEach(item => {
  //     if (item.type !== type) {
  //       found = item;
  //     }
  //   });
  //   if (found) {
  //     found.entry = entry;
  //   } else {
  //     this.add(type,entry);
  //   }
  // }

  // remove(id) {
  //   let temp = [];
  //   // this.items.forEach(item => {
  //   this.ModelService.basket.forEach(item => {
  //     if (item.id !== id) {
  //       temp.push(item);
  //     }
  //   });
  //   // this.items = angular.copy(temp);
  //   this.ModelService.basket = angular.copy(temp);
  // }

  // removeAllByType(type) {
  //   let temp = [];
  //   // this.items.forEach(item => {
  //   this.ModelService.basket.forEach(item => {
  //     if (item.type !== type) {
  //       temp.push(item);
  //     }
  //   });
  //   // this.items = angular.copy(temp);
  //   this.ModelService.basket = angular.copy(temp);
  // }

  // getIds() {
  //   // return this.items.map(x => x.id);
  //   return this.ModelService.basket.map(x => x.id);
  // }

  // actually this is 'getLastByType'
  // getFirstByType(type) {
  //   let found;
  //   // this.items.forEach(item => {
  //   this.ModelService.basket.forEach(item => {
  //     if (item.type === type) {
  //       found = item;
  //     }
  //   });
  //   return found;
  // }

  // getByTypeAndId(type, id) {
  //   let found;
  //   // this.items.forEach(item => {
  //   this.ModelService.basket.forEach(item => {
  //     if (item.type === type && item.id===id) {
  //       found = item;
  //     }
  //   });
  //   return found;
  // }

  // look through the basket entries and check if they tally with the model
  // remove any entries that no longer fit - invalidating what may be there
  // consolodate(model) {
  //
  // }

  get() {
    return {
      // notes: this.notes,
      title: 'Your Cardnet Proposition',
      entries: this.ModelService.basket, // this.items,
      disclaimer: 'These figures are subject to change if the information provided is found to be incorrect'
    };
  }

  // let item = {
  //   id,
  //   title: this.terminal.name,
  //   short: short, // text,
  //   description: this.terminal.description[0] || '',
  //   notes: this.terminal.notes,
  //   costs: [
  //     {
  //       title: text,  // 'Monthly Charge',
  //       recurring: true,
  //       price
  //     }
  //   ]
  // };

  // getFixedItems() {
  //   let list = [];
  //   this.ModelService.basket.forEach(item => {
  //     let entry = item.entry;
  //     if (typeof entry.costs !== 'undefined') {
  //       entry.costs.forEach(cost => {
  //         if (cost.recurring !== 'undefined' && !cost.recurring) {
  //           list.push({ short:entry.short, title:cost.title, price:cost.price });
  //           // list.push(entry);
  //           // list.push(item);
  //         }
  //       });
  //     }
  //   });
  //   return list;
  // }

  // getVariableItems() {
  //   let list = [];
  //   this.ModelService.basket.forEach(item => {
  //     let entry = item.entry;
  //     if (typeof entry.costs !== 'undefined') {
  //       entry.costs.forEach(cost => {
  //         if (cost.recurring !== 'undefined' && cost.recurring) {
  //           list.push({ short:entry.short, title:cost.title, price:cost.price });
  //           // list.push(item);
  //         }
  //       });
  //     }
  //   });
  //   return list;
  // }

  // getFixedTotal() {
  //   let price = 0.0;
  //   this.ModelService.basket.forEach(item => {
  //     let entry = item.entry;
  //     if (typeof entry.costs !== 'undefined') {
  //       entry.costs.forEach(cost => {
  //         if (cost.recurring !== 'undefined' && !cost.recurring) {
  //           price += cost.price;
  //         }
  //       });
  //     }
  //   });
  //   return price;
  // }

  // getVariableTotal() {
  //   let price = 0.0;
  //   this.ModelService.basket.forEach(item => {
  //     let entry = item.entry;
  //     if (typeof entry.costs !== 'undefined') {
  //       entry.costs.forEach(cost => {
  //         if (cost.recurring !== 'undefined' && cost.recurring) {
  //           price += cost.price;
  //         }
  //       });
  //     }
  //   });
  //   return price;
  // }
}

export default angular.module('wcy.services.basket', [])
  .service('BasketService', service)
  .name;
