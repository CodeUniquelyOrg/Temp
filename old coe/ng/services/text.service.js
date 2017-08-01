//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Text Service
//

import angular from 'angular';

import { businessTypes } from 'code/pages/constants';

const pronouns = {
  'Sole Trader': {
    single: 'Owner',
    multiple: 'Owner',
  },
  'Limited Company': {
    single: 'Director',
    multiple: 'Directors',
  },
  'Charity (registered as limited company)': {
    single: 'Director',
    multiple: 'Directors',
  },
  'Partnership': {
    single: 'Partner',
    multiple: 'Partners',
  },
  'Limited Liability Partnership': {
    single: 'Partner',
    multiple: 'Partners',
  },
  'Society': {
    single: 'Principle',
    multiple: 'Principles',
  },
  'Trust': {
    single: 'Principle',
    multiple: 'Principles',
  },
  'Charity': {
    single: 'Principle',
    multiple: 'Principles',
  },
  'Club': {
    single: 'Member',
    multiple: 'Members',
  },
  '': {
    single: 'Person',
    multiple: 'People',
  },
};

class service {

  /* @ngInject */
  constructor(UtilsService, ModelService) {

    // this.match = '';
    this.count = 1;
    this.numberPartners = 1;

    this.UtilsService = UtilsService;
    this.ModelService = ModelService;
  }

  getMatch() {
    return this.UtilsService.lookupSelection(businessTypes, this.ModelService.model.legalEntityType || '');
  }

  getNumberPartners() {
    return parseInt((this.ModelService.model.numberPartners || 0),10) || 1;
  }

  set entityType(typeText) {
    this.match = typeText;
  }

  set partners(count) {
    this.numberPartners = count;
  }

  set applicants(count) {
    this.count = count;
  }

  get questionText() {
    const match = this.getMatch();
    return `Number of ${pronouns[match].multiple}`;
  }

  get header() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return 'Details of Owner';
    }
    if (this.numberPartners===1) {
      return `Details of ${pronouns[match].single}`;
    }
    return `Details of ${pronouns[match].multiple}`;
  }

  get paragraph1() {
    const match = this.getMatch();
    if (match === 'Sole Trader' || this.numberPartners===1) {
      return undefined;
    }
    return `You will need to complete the following section for each ${pronouns[match].single}.`;
  }

  get paragraph2() {
    const match = this.getMatch();
    const single = pronouns[match].single;
    const multiple = pronouns[match].multiple;
    if (match === 'Sole Trader') {
      return 'You can add your details by selecting "Add details". You can edit any existing record, which includes being able to remove it, by selecting "Edit".';
    }
    if (this.numberPartners===1) {
      return `You can add your ${single} by selecting "Add ${single}". You can edit the existing ${single}, which includes being able to remove them, by selecting "Edit". You can always go back through the previous screens to alter the number of ${multiple} you require, should you wish.`;
    }
    return `You can add a new ${single} by selecting "Add ${single}". You can edit existing ${multiple}, which includes being able to remove them, by selecting "Edit". You can always go back through the previous screens to alter the number of ${multiple} you require, should you wish.`;
  }

  get subHeader() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return 'Your Details';
    }
    if (this.numberPartners===1) {
      return `Your ${pronouns[match].single}`;
    }
    return `Your ${pronouns[match].multiple}`;
  }

  get label() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return 'We need a record of your details';
    }
    if (this.numberPartners===1) {
      return `We need a record of the ${pronouns[match].single} details`;
    }
    return `Create one record for each ${pronouns[match].single}`;
  }

  // `You currently have too many records, you will need to remove ${number}`
  // `You currently have too many ${multiple}, you will need to remove ${number}`,
  get error1() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return `You currently have too many records, you will need to remove ${this.count - this.numberPartners}`;
    }
    return `You currently have too many ${pronouns[match].multiple}, you will need to remove ${this.count - this.numberPartners}`;
  }

  // `You need to provide another ${number} ${multiple}`,
  get error2() {
    const match = this.getMatch();
    const number = this.getNumberPartners();
    if (match === 'Sole Trader' || number===1) {
      return undefined;
    }
    let needed = number - this.count;
    if (needed > 1) {
      return `You need to provide another ${number - this.count} ${pronouns[match].multiple}`;
    }
    if (needed===1) {
      return `You need to provide another ${pronouns[match].single}`;
    }
    return undefined;
  }

  get error3() {
    const match = this.getMatch();
    const number = this.getNumberPartners();
    if (number > 1) {
      return `Please fill out all the details for your ${pronouns[match].multiple}`;
    }
    return `Please fill out all the details for your ${pronouns[match].single}`;
  }

  get error4() {
    const match = this.getMatch();
    return `Please fill out all the address details for this ${pronouns[match].single}`;
  }

  get buttonText() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return 'Add Details';
    }
    return `Add ${pronouns[match].single}`;
  }

  get addressHeading() {
    const match = this.getMatch();
    if (match === 'Sole Trader') {
      return 'Your Address';
    }
    return `${pronouns[match].single}\'s Address`;
  }

  get name() {
    const match = this.getMatch();
    return pronouns[match].single;
  }

  get single() {
    const match = this.getMatch();
    return pronouns[match].single;
  }

  get multiple() {
    const match = this.getMatch();
    return pronouns[match].multiple;
  }
}

export default angular.module('myApp.services.text', [])
  .service('TextService', service)
  .name;
