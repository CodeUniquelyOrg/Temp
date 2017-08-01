//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Model Service
//

import angular from 'angular';

import { businessTypes, bankWithTypes, agreementLengthTypes } from 'code/pages/constants';

class service {

  /* @ngInject */
  constructor($localStorage, $sessionStorage, ConstantsService, UtilsService) {

    // configure the storage type
    if (ConstantsService.options.storageToUse === 'session') {
      this.storage = $sessionStorage;
    } else {
      this.storage = $localStorage;
    }

    // sometimes uses the lookup function
    this.UtilsService = UtilsService;

    // expose the reset function
    this.bindFunctions();
  }

  /* eslint-disable max-statements */
  bindFunctions() {
    this.reset = this.reset.bind(this);

    this.reset = this.reset.bind(this);
    // this.requireRegNumber = this.requireRegNumber.bind(this);
    // this.requireIncorporationDate = this.requireIncorporationDate.bind(this);
    // this.requireCharityNumber = this.requireCharityNumber.bind(this);

    this.isLimitedOrCharityOrLLP = this.isLimitedOrCharityOrLLP.bind(this);
    this.isSoleOrPartnershipOrCharity = this.isSoleOrPartnershipOrCharity.bind(this);
    this.isLimitedOrCharity = this.isLimitedOrCharity.bind(this);
    this.isAnySortOfCharity = this.isAnySortOfCharity.bind(this);
    this.isCharity = this.isCharity.bind(this);
    this.isLLP = this.isLLP.bind(this);
    this.isPartnership = this.isPartnership.bind(this);
    this.isNotSoleTrader = this.isNotSoleTrader.bind(this);
    this.isSoleTrader = this.isSoleTrader.bind(this);

    // pricing model
    this.isPrice18 = this.isPrice18.bind(this);
    this.isPrice36 = this.isPrice36.bind(this);
    this.isPrice48 = this.isPrice48.bind(this);

    this.isLloydsCustomer = this.isLloydsCustomer.bind(this);
    this.isFaceToFace = this.isFaceToFace.bind(this);
    this.isOverThePhone = this.isOverThePhone.bind(this);
    this.isOnline = this.isOnline.bind(this);

    this.isMultipleLocations = this.isMultipleLocations.bind(this);
    this.isTakingPayments = this.isTakingPayments.bind(this);
    this.isTerminalSelected = this.isTerminalSelected.bind(this);
    this.isCloverTerminal = this.isCloverTerminal.bind(this);
    this.isNotAwayFromTill = this.isNotAwayFromTill.bind(this);
    this.hasFixedTillPoint = this.hasFixedTillPoint.bind(this);
    this.isCoolingOffAllowed = this.isCoolingOffAllowed.bind(this);

    this.requireDebits = this.requireDebits.bind(this);
    this.isOrdersAhead = this.isOrdersAhead.bind(this);
    this.isTakesDeposits = this.isTakesDeposits.bind(this);
    this.isExtendedPayments = this.isExtendedPayments.bind(this);
    this.isRequiredVAT = this.isRequiredVAT.bind(this);
    this.requireDelivery = this.requireDelivery.bind(this);
  }
  /* eslint-enable max-statements */

  reset() {
    this.storage.reset();
  }

  get model() {
    if (!this.storage.cardnet) {
      this.storage.cardnet = {};
    }
    return this.storage.cardnet;
  }
  set model(value) {
    if (value === null || typeof value === 'undefined') {
      delete this.storage.cardnet;
    } else {
      this.storage.cardnet = value;
    }
  }

  get companiesHouse() {
    if (!this.storage.temp) {
      this.storage.companiesHouse = {};
    }
    return this.storage.companiesHouse;
  }
  set companiesHouse(value) {
    if (value === null || typeof value === 'undefined') {
      delete this.storage.companiesHouse;
    } else {
      this.storage.companiesHouse = value;
    }
  }

  get temp() {
    if (!this.storage.temp) {
      this.storage.temp = {};
    }
    return this.storage.temp;
  }
  set temp(value) {
    if (value === null || typeof value === 'undefined') {
      delete this.storage.temp;
    } else {
      this.storage.temp = value;
    }
  }

  // requireRegNumber() {
  //   const value = this.storage.cardnet.legalEntityType;
  //   const match = this.UtilsService.lookupSelection(businessTypes, value);
  //   return (match === 'Limited Company' || match === 'Limited Liability Partnership' || match === 'Charity (registered as limited company)');
  // }

  // requireCharityNumber() {
  //   const value = this.storage.cardnet.legalEntityType;
  //   const match = this.UtilsService.lookupSelection(businessTypes, value);
  //   return (match === 'Charity' || match === 'Charity (registered as limited company)');
  // }

  isLimitedOrCharityOrLLP() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return (match === 'Limited Company' || match === 'Limited Liability Partnership' || match === 'Charity (registered as limited company)');
  }

  isLimitedOrCharity() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return (match === 'Limited Company' || match === 'Charity (registered as limited company)');
  }

  isSoleOrPartnershipOrCharity() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return (match === 'Sole Trader' || match === 'Partnership' || match === 'Charity');
  }

  isAnySortOfCharity() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return (match === 'Charity' || match === 'Charity (registered as limited company)');
  }

  isCharity() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return match === 'Charity';
  }

  isLLP() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return match === 'Limited Liability Partnership';
  }

  isPartnership() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return match === 'Partnership';
  }

  isNotSoleTrader() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return match !== 'Sole Trader';
  }

  isSoleTrader() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);
    return match === 'Sole Trader';
  }

  // Cooling Off Period =>
  // Should not show if the following has been selected:
  //   Clover terminals
  //   Limited company including Charity registered as a limited company
  //   or Partnerships with more than 4 Partners
  // NOT IF:
  //   business entity is Limited Company or Charity registered as a limited company
  //   business entity is Partnership with more than 4 Partners
  //   a Clover termnal has been selected
  isCoolingOffAllowed() {
    const value = this.storage.cardnet.legalEntityType;
    const match = this.UtilsService.lookupSelection(businessTypes, value);

    // Limited Company or Charity (registered as a limited company)
    if (match === 'Limited Company' || match === 'Charity (registered as limited company)') {
      return false;
    }

    // Partnership and with more than 4 people
    const partners = parseInt(this.storage.cardnet.numberPartners || 0, 10);
    if (match === 'Partnership' && partners > 4) {
      return false;
    }

    // Clover Terminal
    if (this.isCloverTerminal()) {
      return false;
    }

    return true;
  }

  // { value:'1',  text:'18 Months' },
  // { value:'2',  text:'36 Months' },
  // { value:'3',  text:'48 Months' },
  isPrice18() {
    const value = this.storage.cardnet.agreementLength;
    const match = this.UtilsService.lookupSelection(agreementLengthTypes, value);
    return match === '18 Months';
  }

  isPrice36() {
    const value = this.storage.cardnet.agreementLength || 0;
    const match = this.UtilsService.lookupSelection(agreementLengthTypes, value);
    return match === '36 Months';
  }

  isPrice48() {
    const value = this.storage.cardnet.agreementLength;
    const match = this.UtilsService.lookupSelection(agreementLengthTypes, value);
    return match === '48 Months';
  }

  isFaceToFace() {
    if (this.storage.cardnet.cardPayments && this.storage.cardnet.cardPayments.faceToFace) {
      return this.storage.cardnet.cardPayments.faceToFace !== '0';
    }
    return false;
  }
  isOverThePhone() {
    if (this.storage.cardnet.cardPayments && this.storage.cardnet.cardPayments.overThePhone) {
      return this.storage.cardnet.cardPayments.overThePhone !== '0';
    }
    return false;
  }
  isOnline() {
    if (this.storage.cardnet.cardPayments && this.storage.cardnet.cardPayments.online) {
      return this.storage.cardnet.cardPayments.online !== '0';
    }
    return false;
  }

  isLloydsCustomer() {
    const value = this.storage.cardnet.banking;
    const match = this.UtilsService.lookupSelection(bankWithTypes, value);
    return match === 'Lloyds' || match === 'Bank of Scotland';
  }

  isTerminalSelected() {
    return typeof this.storage.cardnet.terminal !== 'undefined';
  }

  isCloverTerminal() {
    return this.storage.cardnet.isCloverTerminal || false;
  }

  isNotAwayFromTill() {
    return this.storage.cardnet.awayFromTillPoint === '-1';  // -1 === 'No'
  }

  isTakingPayments() {
    return (this.storage.cardnet.takingCardPayments === '1');
  }

  isMultipleLocations() {
    return this.storage.cardnet.needMultipleTerminalLocations === '1';
  }

  hasFixedTillPoint() {
    return this.storage.cardnet.fixedTillPoint === '1';
  }

  requireDebits() {
    return this.storage.cardnet.accountforDebits === '1';
  }

  isOrdersAhead() {
    return this.storage.cardnet.ordersAhead === '1';
  }

  isTakesDeposits() {
    return this.storage.cardnet.takesDeposits === '1';
  }

  isExtendedPayments() {
    return this.storage.cardnet.takesExtendedPayments === '1';
  }

  isRequiredVAT() {
    return this.storage.cardnet.vatRegistered === '1';
  }

  requireDelivery() {
    return this.storage.cardnet.offerDelivery === '1';
  }

  // *** A shopping basket ***
  // get basket() {
  //   if (!this.storage.basket) {
  //     this.storage.basket = [];
  //   }
  //   return this.storage.basket;
  // }
  // set basket(value) {
  //   if (value === null || typeof value === 'undefined') {
  //     delete this.storage.basket;
  //   } else {
  //     this.storage.basket = value;
  //   }
  // }

  // get uid() {
  //   if (!this.storage.uid) {
  //     this.storage.uid = 0;
  //   }
  //   this.storage.uid = this.storage.uid + 1;
  //   return this.storage.uid;
  // }
}

export default angular.module('myApp.services.model',  [])
  .service('ModelService', service)
  .name;
