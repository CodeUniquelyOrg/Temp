/* globals Promise */
import angular from 'angular';
import * as constants from '../pages/constants.js';

class service {

  /* @ngInject */
  constructor(AsyncService, ModelService, UtilsService, HitLogService, MccService, TerminalService) {

    this.AsyncService = AsyncService;
    this.ModelService = ModelService;
    this.UtilsService = UtilsService;
    this.HitLogService = HitLogService;
    this.MccService = MccService;
    this.TerminalService = TerminalService;

    const resource = AsyncService.customerSubmitResource;

    this.SubmitFormEntry = resource('SubmitFormEntry');
    this.SubmitApplicantAddress = resource('SubmitApplicantAddress');
    this.SubmitApplicant = resource('SubmitApplicant');
    this.CommitFormEntry = resource('CommitFormEntry');

    // expose the reset function
    this.bindFunctions();
  }

  bindFunctions() {
    this.save = this.save.bind(this);
  }

  TrueFalse(value) {
    if (typeof value  === undefined) {
      return false;
    }
    const truth = this.UtilsService.lookupSelection(constants.yesNo, value);
    return truth === 'Yes' ? 1 : 0;
  }

  // ==========================================================
  // ARSAM - all the entries here commented out need adding in
  //         and assigning to the expected portal value for LBG
  //
  // ==========================================================

  // save the data
  /* eslint-disable complexity */
  save(entry) {

    const formEntry = {

      // Page 1
      title: entry.title === 'Other' ? entry.other : entry.title,
      forename: entry.forename,
      middleName: entry.middleName || null,    // NEVER COLLECTED
      surname: entry.surname,
      telephone: entry.preferredContactNumber, // MAY NOT ACTUALLY BE A TELEPHONE (could be mobile)
      mobile: entry.secondaryContactNumber,    // MAY NOT ACTUALLY BE A MOBILE (could be a telephone could be empty)
      emailAddress: entry.emailAddress,
      /*
        LBG - Moved to page 1
      */
      legalbusinessName: entry.legalbusinessName || null,
      registeredLine1: entry.registered && entry.registered.line1 ? entry.registered.line1 : null,
      registeredLine2: entry.registered && entry.registered.line2 ? entry.registered.line2 : null,
      registeredTownCity: entry.registered && entry.registered.townCity ? entry.registered.townCity : null,
      registeredCounty: entry.registered && entry.registered.county ? entry.registered.county : null,
      registeredPostcode: entry.registered && entry.registered.postcode ? entry.registered.postcode : null,

      businessType: this.MccService.getById().text,
      legalEntityType: this.UtilsService.lookupSelection(constants.businessTypes, entry.legalEntityType),
      registrationNumber: entry.registrationNumber  || null,
      charityNumber: entry.charityNumber  || null,
      businessDescription: entry.businessDescription,
      needMultipleTerminalLocations: this.TrueFalse(entry.needMultipleTerminalLocations),
      dpaStatement: entry.dpaStatement === true ? 1 : 0,

      /* REMOVED BY LBG
      preferredContactTime: this.UtilsService.lookupSelection(constants.contactTimes, entry.preferredContactTime),
      */

      // Page 2
      /*
        LBG - Moved to page 2
      */
      tradingName: entry.tradingName,
      line1: entry.trading.line1,
      line2: entry.trading.line2,
      townCity: entry.trading.townCity,
      county: entry.trading.county,
      postcode: entry.trading.postcode,

      numberPartners: entry.numberPartners,
      dateIncorporated: entry.dateIncorporated || null,        // New
      dateBuinessStarted: entry.dateBuinessStarted || null,    // New
      sectorExperience: entry.sectorExperience,                // New
      fundingSource: entry.fundingSource || null,
      takingCardPayments: this.TrueFalse(entry.takingCardPayments),
      banking: this.UtilsService.lookupSelection(constants.bankWithTypes, entry.banking), // Lookup the Banks Name
      bankAccountName: entry.bankAccountName,  // New - Bank Account Name
      sortCode: entry.sortCode,
      accountNumber: entry.accountNumber,
      accountforDebits: this.TrueFalse(entry.accountforDebits), // New
      bankAccountNameDebits: entry.bankAccountNameDebits,       // New
      sortCodeDebits: entry.sortCodeDebits,                     // New
      accountNumberDebits: entry.accountNumberDebits,           // New
      annualTurnover: entry.annualTurnover,
      annualTurnoverCard: entry.annualTurnoverCard,
      avgTransValue: entry.avgTransValue,
      stockLevel: entry.stockLevel,
      foreignTransactions: this.TrueFalse(entry.foreignTransactions),

      /*
        LBG - No Longer Sliders - MANUAL TEXT ENTRY
      */
      // Now an object with %
      // {
      //   faceToFace: '30',
      //   overThePhone: '60',
      //   online: '10',
      // }
      faceToFacePayment: parseInt(entry.cardPayments.faceToFace,10),
      onlinePayment: parseInt(entry.cardPayments.online,10),
      overThePhonePayment: parseInt(entry.cardPayments.overThePhone,10),

      // Page 3
      awayFromPremisies: this.TrueFalse(entry.awayFromPremisies),
      awayFromTillPoint: this.TrueFalse(entry.awayFromTillPoint),
      fixedTillPoint: this.TrueFalse(entry.fixedTillPoint),
      preAuthNeeded: this.TrueFalse(entry.preAuthNeeded),
      eTopUp: this.TrueFalse(entry.eTopUp),

      // Page 4
      terminal: this.TerminalService.getById().name,
      isCloverTerminal: entry.isCloverTerminal,
      numberOfTerminals: entry.numberOfTerminals,
      agreementLength: entry.agreementLength,  // LBG - New

      // Page 5
      /* LBG - THERE IS NOW ONLY ONE - AGREEMENT TYPE REMOVED
      agreement: this.TrueFalse(entry.agreement),
      */

      /*
        LBG THESE HAVE NOW BEEN REPLACED with Yes / No Questions
      */
      fasterSettlement: this.TrueFalse(entry.fasterSettlement),
      amex: this.TrueFalse(entry.amex),
      cashback: this.TrueFalse(entry.cashback),

      // Page 7 (New)
      ordersAhead: this.TrueFalse(entry.ordersAhead),
      perentageBeforeDelivery: entry.perentageBeforeDelivery || null,
      advanceFullPayment: entry.advanceFullPayment || null,
      takesDeposits: this.TrueFalse(entry.takesDeposits),
      perentageAnnualDeposit: entry.perentageAnnualDeposit || null,
      percentDeposit: entry.percentDeposit || null,
      advanceDeposit: entry.percentDeposit || null,
      takesExtendedPayments: this.TrueFalse(entry.takesExtendedPayments),
      perentageAnnualWarranties: entry.perentageAnnualWarranties || null,
      aveLengthGuarantees: entry.aveLengthGuarantees || null,
      guaranteesDetails: entry.guaranteesDetails || null,
      /*
        LBG - No Longer Sliders - MANUAL TEXT ENTRY
      */
      // fulfillment - an object with %
      // {
      //   within7Days: '60',
      //   within15Days: '30',
      //   within30Days: '10',
      //   over30Days: '0'
      // }
      fulfillmentOver30Days: parseInt(entry.fulfillment.over30Days,10),
      fulfillmentWithin7Days: parseInt(entry.fulfillment.within7Days,10),
      fulfillmentWithin15Days: parseInt(entry.fulfillment.within15Days,10),
      fulfillmentWithin30Days: parseInt(entry.fulfillment.within30Days,10),
      vatRegistered: this.TrueFalse(entry.vatRegistered),
      vatNumber: entry.vatNumber || null,
      offerDelivery: this.TrueFalse(entry.offerDelivery),
      deliverType: this.UtilsService.lookupSelection(constants.deliveryTypes, entry.deliverType),

      // Page 8a (New)
      mainContactTitle: entry.mainContactTitle === 'Other' ? entry.mainContactOther : entry.mainContactTitle,
      mainContactForename: entry.mainContactForename || null,
      mainContactMiddle: entry.mainContactMiddle || null,   // NOT COLLECTED
      mainContactSurname: entry.mainContactSurname || null,
      mainContactNumber: entry.mainContactNumber || null,
      jobTitle: this.UtilsService.lookupSelection(constants.jobTitleTypes, entry.jobTitle),

      /* LBG Toggled to NOT fields */
      notPassToCardSchemes: this.TrueFalse(entry.notPassToCardSchemes),
      notMarketingInformationLloyds: this.TrueFalse(entry.notMarketingInformationLloyds),
      notMarketingInformationOther: this.TrueFalse(entry.notMarketingInformationOther),
      marketingType: this.UtilsService.lookupSelection(constants.marketingTypes, entry.marketingTypes), // Its fine - but it may not exist

      // Page 9
      coolingOff: this.TrueFalse(entry.coolingOff),
      creditCheck: this.TrueFalse(entry.creditCheck),
      personalData: this.TrueFalse(entry.personalData),
      followUp: this.TrueFalse(entry.followUp),
    };

    return this.SubmitFormEntry.save(formEntry).then(([{ id: formEntryId }]) => {

      // Process all the Applicants and Each of their addresses
      return Promise.all(entry.applicants.map(({ addresses, ...person }) => {

        // 'person' holds the data for the individual being processed
        // Copy the record so we can add /delete without reference issues
        let data = angular.copy(person);

        // CREATE FASHION MISSING / DEPENDANT ITEMS
        data.title = data.title === 'Other' ? person.other : person.title,
        data.middleName = '',     // NEVER COLLECTED

        // *************************************************************
        // now SAFELY remove these items from the data being sent back
        // *************************************************************
        delete data.usePrevious;
        delete data.other;

        /* no such question / data in app
        data.britishCitizen = data.britishCitizen || null;
        */
        // Lookup the Nationality name
        data.nationality = this.UtilsService.lookupSelection(constants.nationalities, data.nationality);

        // For each applicant in the array of applicants, submit their data (minus addreses)
        return this.SubmitApplicant.save({ formEntryId, ...data }).then(([{ id: applicantId }]) =>{

          // get back applicants id (from db)

          // loop through each of their address and submit to the db
          return Promise.all(addresses.map(address => {
            const movedInParts = address.movedIn.split('/');
            const movedOutParts = address.movedOut.split('/');

            address.movedIn =`${movedInParts[1]}/${movedInParts[0]}/01`;
            address.movedOut =`${movedOutParts[1]}/${movedOutParts[0]}/01`;
            address.currentAddress = this.TrueFalse(address.currentAddress);
            address.ownershipType = this.UtilsService.lookupSelection(constants.ownershipTypes, address.ownershipType);

            // *** you may need to remove ***
            // month, year

            this.SubmitApplicantAddress.save({ applicantId, ...address });
          }));
        });

      }))
      .then(() => this.CommitFormEntry.save({ formEntryId }))
      .then(([{ returnBit, returnMessage }]) => {
        if (returnBit) {
          return entry;
        } else {
          throw new Error(returnMessage);
        }
      }).catch(exception => console.log(exception));  // eslint-disable-line no-console
    });
  }
  /* eslint-enable complexity */
}

export default angular.module('myApp.services.submit', [])
  .service('SubmitService', service)
  .name;
