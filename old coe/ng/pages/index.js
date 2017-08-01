// ===========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Index (Pages)
// ===========================================================
import angular from 'angular';

// Services that need to be injected the app's code
import constantsService from 'services/constants.service';   // used to load constants
// import uniqueIdService from 'services/uniqueid.service';     // gets unique ID for control groups
// import asyncService from 'services/async.service';
// import hitLogService from 'services/hit-log.service';
import modelService from 'services/model.service';           // hold the state / data model
// import submitService from 'services/submit.service';         // saves data after entry by user
// import terminalService from 'services/terminal.service';
// import basketService from 'services/basket.service';
// import agreementService from 'services/agreement.service';
// import decisionService from 'services/decision.service';
// import settlementService from 'services/settlement.service';
import textService from 'services/text.service';             // entity based messages (single/multiple)
import utilsService from 'services/utils.service';           // utilities

// import data8Service from 'services/data8.service';
// import companiesHouseService from 'services/companies-house.service';

// filters
import dateFilter from 'filter/date';
import htmlFilter from 'filter/html';
import ifEmptyFilter from 'filter/ifEmpty';
import yesnoFilter from 'filter/yesno';

// input enforcement
import ensureDigits from 'validations/ensure-digits';
import ensureAlpha from 'validations/ensure-alpha';
import ensureAlphanumeric from 'validations/ensure-alphanumeric';
import ensureText from 'validations/ensure-text';
import ensurePostcode from 'validations/ensure-postcode';

// pages
import page0 from 'code/pages/page0';

// components
// import stickyScroll from 'code/components/sticky-scroll';
import debug from 'code/components/debug';
import helpText from 'code/components/help-text';
import formHeader from 'code/components/form-header';
import pageHeader from 'code/components/page-header';
import firstParagraph from 'code/components/first-paragraph';

import sectionHeader from 'code/components/section-header';
import subHeader from 'code/components/sub-header';
import introParagraph from 'code/components/intro-paragraph';
import paragraph from 'code/components/paragraph';
import spacer from 'code/components/spacer';
import note from 'code/components/note';
import footNote from 'code/components/foot-Note';
import textInput from 'code/components/text-input';
import textOnlyInput from 'code/components/text-only-input';
import wrapTextInput from 'code/components/wrap-text-input';
import optionalInput from 'code/components/optional-input';
import numberInput from 'code/components/number-input';
import emailInput from 'code/components/email-input';
import postcodeInput from 'code/components/postcode-input';
import telephoneInput from 'code/components/telephone-input';
import optionalTelephoneInput from 'code/components/optional-telephone-input';
// import currencyInput from 'code/components/currency-input';
import selectInput from 'code/components/select-input';
import radioInput from 'code/components/radio-input';
import checkboxInput from 'code/components/checkbox-input';
import acceptInput from 'code/components/accept-input';
import checkboxEmbed from 'code/components/checkbox-embed';
// import accountNumberInput from 'code/components/account-number-input';
// import companyNumberInput from 'code/components/company-number-input';
// import sortCode from 'code/components/sort-code';
import monthYear from 'code/components/month-year';
import dayMonthYear from 'code/components/day-month-year';
import dateOfBirth from 'code/components/date-of-birth';

import buttonBar from 'code/components/button-bar';
import linkButton from 'code/components/link-button';
// import accordion from 'code/components/accordion';

// new components
import image from 'code/components/image';
// import basket from 'code/components/basket';
// import applicantListNew from 'code/components/applicant-list-new';
// import applicantFormNew from 'code/components/applicant-form-new';
// import applicantAddressList from 'code/components/applicant-address-list';
// import addressFormNew from 'code/components/address-form-new';
// import addressPafForm from 'code/components/address-paf-form';

// import slider from 'code/components/slider';
// import sliderGroup from 'code/components/slider-group';
// import noSliderGroup from 'code/components/no-slider-group';

// routing
import routing from './routing';

// common page styling
import 'style/forms.scss';

export default angular.module('myApp.cardnet.pages', [

  // services
  constantsService,
  // uniqueIdService, submitService, asyncService, hitLogService,
  // terminalService, basketService, agreementService, settlementService,
  // decisionService,
  textService, utilsService,

  // data8Service, companiesHouseService,

  // data models
  modelService,

  // esure inputs
  ensureDigits, ensureAlpha, ensureAlphanumeric, ensureText, ensurePostcode,

  // components
  // stickyScroll,

  debug, helpText, spacer,
  formHeader, pageHeader, introParagraph,
  sectionHeader, subHeader, paragraph, firstParagraph, footNote, note,
  textInput, textOnlyInput, wrapTextInput, optionalInput, selectInput, radioInput,
  checkboxInput, acceptInput, checkboxEmbed, emailInput, numberInput,
  postcodeInput, telephoneInput, optionalTelephoneInput, 
  // currencyInput,
  // accountNumberInput, companyNumberInput, sortCode,
  monthYear, dayMonthYear, dateOfBirth,
  // accordion, basket,
  buttonBar, linkButton,
  image,
  // noSliderGroup, sliderGroup, slider,

  // filters
  dateFilter, ifEmptyFilter, yesnoFilter, htmlFilter,

  // collection / form - specific components
  // addressFormNew, applicantListNew, applicantFormNew, addressPafForm, applicantAddressList,

  // pages - RENAME LATER
  page0,
  // page1,
  // page1a,
  // page2, page3, page4, page5,
  // page6,
  // page7, page8, page8a, page9,
  // callback, callin,
  // dropout1, dropout2,
  // finish, pagex,
])
.config(routing)
.name;
