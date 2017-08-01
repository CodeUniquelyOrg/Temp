//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Terminal service
//
import angular from 'angular';

const terminals = [
  {
    id: 1,
    type: 'countertop',
    name: 'Ingenico ICT 250',
    description: [
      'Compact, full featured countertop terminal; ideal for businesses where payments are always taken at the till.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay.',
      'Colour screen and backlit keyboard to improve usability',
      'Weight: 324g',
      'Size: 83x185x63mm'
    ],
    detail: [
      'This terminal stays at the till and is plugged into your phone line or router.',
      'This method is ideal for any business where payments are always taken at the till, such as grocery stores, hotels and traditional retail shops.',
    ],
    price18: 20.00,
    price36: 17.50,
    price48: 15.30,
    images: ['ingenico_ict250.png'],
  },

  {
    id: 2,
    type: 'portable',
    name: 'Ingenico – IWL252',
    description: [
      'A light, full featured portable terminal, with all-day battery life and Bluetooth connectivity, allows you to take payments all day, anywhere on your premises.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay.',
      'Colour screen and backlit keyboard improve usability.',
      'Weight: 285g',
      'Size: 78x150x44mm'
    ],
    detail: [
      'If you want to accept payments throughout your premises, a Bluetooth machine offers the portability you need.',
      'The handsets are wireless and work within about 70 metres of the base unit.',
      'This method is ideal for businesses that offer table service, such as pubs, cafes and restaurants.'
    ],
    price18: 19.95,
    price36: 20.49,
    price48: 20.98,
    notes: [
      'Terminal: range limited to 70m from base unit'
    ],
    images: ['ingenico_iwl252.png'],
  },

  {
    id: 3,
    type: 'countertop',
    name: 'Verifone – vX520',
    description: [
      'Durable, full featured countertop terminal; ideal for businesses where payments are always taken at the till.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay.',
      'Colour screen and backlit keyboard improve usability.',
      'Weight: 500g',
      'Size: 87x203x76'
    ],
    detail: [
      'This terminal stays at the till and is plugged into your phone line or router.',
      'This method is ideal for any business where payments are always taken at the till, such as grocery stores, hotels and traditional retail shops.'
    ],
    price18: 15.00,
    price36: 15.25,
    price48: 15.57,
    images: ['terminals/verifone_vx520.png'],
  },

  {
    id: 4,
    type: 'mobile',
    name: 'Verifone – vX680',
    description: [
      'A full featured GPRS terminal with a large, colour touch screen, spill-proof keypad and long battery life allows you to take payments anywhere, all day.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay.',
      'Colour, touch screen and backlit keyboard improve usability.',
      'Weight: 479g',
      'Size: 82x172x62mm'
    ],
    detail: [
      'A mobile GPRS network connection allows your machine to work similarly to a mobile phone.',
      'It has a SIM card and doesn\'t require a phone or broadband connection, so it can be used on the go.',
      'This method is ideal for selling at events like conferences and tradeshows.',
      'It’s also perfect for those who sell outdoors, such as food truck, farmer’s market and coffee stand vendors.'
    ],
    price18: 24.95,
    price36: 23.50,
    price48: 21.79,
    images: ['verifone_vx680.png'],
  },

  {
    id: 5,
    type: 'countertop',
    name: 'Clover Mini',
    description: [
      'An easy to use terminal and business management solution, with a 7" high resolution, colour touch screen. A built-in front facing camera/QR scanner, with an integrated high speed thermal receipt printer.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay. Also tracks cash payments, viewable on the Clover online dashboard.',
      'Clover Mini is intuitive, easy to use and equipped with software that will help you improve your business. It is customisable through a comprehensive app market so can grow with your business.',
      'Ethernet and WiFi enabled as standard, 3G sim enabled version available.',
      'Weight: 1.04kg',
      'Size: H: 6.47” W: 8.0” D: 3.73”'
    ],
    detail: [
      'Terminal simplicity meets next generation payments technology in a small, neat package.',
      'Ideal for individual businesses who want a future proof solution, or as an addition to Clover Station.'
    ],
    price18: 19.90,
    price36: 17.00,
    price48: 13.95,
    images: ['clover_mini.png'],
  },

  {
    id: 6,
    type: 'mobile',
    name: 'Clover Mobile',
    description: [
      'A portable, easy to use terminal and business management solution, with a 7" high resolution, colour touch screen.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay. Also tracks cash payments, viewable on the Clover online dashboard.',
      'Suits industries and venues were card payments can be taken to the customer. A barcode scanner is built into the ergonomic handle.',
      'Take payments on the go, or in your businesses premises. Includes a bluetooth connected printer and charging dock.',
      'WiFI and 3G sim enabled (no SIM supplied)',
      'Weight: 544g',
      'Size: H: 5.3” W: 7.9” D: 3.6”'
    ],
    detail: [
      'Our most mobile device gives the greatest degree of flexibility, and still offers cutting edge payment acceptance.',
      'Ideal for small businesses, or individual employees such as restaurant or warehouse staff, who take orders and payments on-the-go.'
    ],
    price18: 31.50,
    price36: 28.98,
    price48: 26.65,
    images: ['clover_mobile.png'],
  },

  {
    id: 8,
    type: 'countertop',
    name: 'Clover Station',
    description: [
      'A full featured till and business management solution, with a 11.6" high resolution, colour touch screen. An integrated barcode and QR scanner, with a connected high speed thermal receipt printer.',
      'Accepts all payment methods: Chip + PIN, Magstripe and Contactless, including Apple Pay & Android Pay. Also tracks cash payments, viewable on the Clover online dashboard.',
      'Clover Station is intuitive, easy to use and equipped with software that will help you improve your business. It is customisable through a comprehensive app market so can grow with your business.',
      'Ethernet and WiFi enabled',
      'Touch Screen and Card reader',
      'Size: 11.6" high resolution touchscreen attached to an 11"x7.5" base plate',
      'Clover Mini as a customer facing screen for taking payments.',
      'Receipt Printer',
      'Size: (6.89” x 6.89” x 6.94”)',
      'Overall Weight: 2.27kg'
    ],
    detail: [
      'A till system that accepts payments, tracks stock and grows with your business through the Clover app market'
    ],
    notes: [
      '£43.00 (excluding VAT) per month for hardware, £49.99 per month for software (1st device per MID)'
    ],
    price18: 0.0,
    price36: 80.00,
    price48: 92.99,
    images: ['clover_station.png'],
  },

  {
    id: 99,
    type: 'internet',
    name: 'Payment Gateway',
    description: [
      'Accept payments through your website quickly and securely with Lloyds Bank Online Payments.',
      'Hosted Payment Page for online payments',
      'Virtual Terminal for mail & telephone orders',
      'Strong Fraud Prevention tool to help protect you and your customers',
      'Detailed online Management Information portal'
    ],
    detail: [
      'We host the payment pages and take responsibility for storing your customers’ payment details securely, ensuring PCI DSS compliance.',
      'Mobile Commerce enabled - ideal for businesses wanting to sell via a mobile optimised website.',
      'We also act as your acquiring bank, reducing administration time.'
    ],
    price18: 0.0,  // info to follow
    price36: 0.0,  // info to follow
    price48: 0.0,  // info to follow
    images: ['payment_gateway.png'],
  }

];

class service {

  /* @ngInject */
  constructor(ModelService) {
    this.ModelService = ModelService;

    this.terminals = terminals;
  }

  // assumption is that there will need to be some formatting
  // of the request that is sent to the backend for terminals
  buildRequest(inputs) {
    // just echo the contents for now
    return {
      legalEntityType: inputs.legalEntityType,
      contractType: inputs.contractType,
      settlementType: inputs.settlementType,
      terminalOutside: inputs.terminalOutside,
      router: inputs.router,
      amex: inputs.amexPayments,
      cashback: inputs.cashback,
      awayFromTillPoint: inputs.awayFromTillPoint,
      eTopUp: inputs.eTopUp,
      panPad: inputs.pinPad
    };
  }

  whatOnlineOptionsApply() {
    return [ 'Payment Gateway' ];
  }

  // ALL 8 have options
  // terminals.push('Ingenico ICT 250');
  // terminals.push('Verifone – vX520');
  // terminals.push('Clover Mini');
  // terminals.push('Clover Mobile');
  // terminals.push('Verifone – vX680');
  // terminals.push('Ingenico – IWL252');  // ????
  // terminals.push('Payment Gateway');
  // terminals.push('Clover Station');
  whatTerminalsApply(inputs) {
    let names = [];

    //
    if (inputs.awayFromPremisies === true) {
      names.push('Verifone – vX680');
      if ( inputs.preAuthSector && !inputs.preAuthNeeded ) {
        names.push('Clover Mobile');
      }
    } else if (/* inputs.awayFromPremisies===false && */ inputs.awayFromTillPoint===true ) {
      names.push('Ingenico – IWL252');
      if ( inputs.preAuthSector && !inputs.preAuthNeeded ) {
        names.push('Clover Mobile');
      }
    } else if (/* inputs.awayFromPremisies===false && inputs.awayFromTillPoint===false && */inputs.fixedTillPoint===false) {
      names.push('Verifone – vX680');
      if ( inputs.preAuthSector && !inputs.preAuthNeeded ) {
        names.push('Clover Mobile');
      }
    } else if (/* inputs.awayFromPremisies===false && inputs.awayFromTillPoint===false && */ inputs.fixedTillPoint===true ) {

      // THERS IS A QUESTION ABOUT "IN eTOPUP Sector"
      // - but there isn't a 'NO' answer path for it

      if ( inputs.eTopupSector && inputs.eTopUpRequired ) {
        names.push('Verifone – vX520');
      } else {
        names.push('Clover Mini');
        if ( inputs.rbbDeal ) {
          names.push('Verifone – vX520');
        } else {
          names.push('Ingenico ICT 250');
        }
      }
    }

    return names;
  }

  buildSelection(names) {
    let selection = [];
    this.terminals.forEach( terminal => {
      if (names.indexOf(terminal.name) !== -1) {
        selection.push(terminal);
      }
    });
    return selection;
  }

  getTerminals(inputs) {
    let names;
    // online / over the phone / internet ????
    if (inputs.online) {
      names = this.whatOnlineOptionsApply(inputs);
    } else {
      names = this.whatTerminalsApply(inputs);
    }
    let selection = this.buildSelection(names);
    return selection;
  }

  getById() {
    let found;
    this.terminals.forEach(item => {
      if (item.id===this.ModelService.model.terminal) {
        found = item;
      }
    });
    return found;
  }

  getByName(name) {
    let found;
    this.terminals.forEach(item => {
      if (item.name===name) {
        found = item;
      }
    });
    return found;
  }
}

export default angular.module('wcy.services.terminal', [])
  .service('TerminalService', service)
  .name;
