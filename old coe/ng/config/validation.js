//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Application validation config for angular-validation
//
// https://github.com/huei90/angular-validation/blob/master/API.md
//

// Inject All the inteceptors /providers
/* @ngInject */
export default function($validationProvider) {

  let RegExpNotRequired = function(regexp) {
    return function (value) {
      if (typeof value === 'undefined' ) {
        return true;
      }
      return regexp.test(value); /* regexp expression */
    };
  };

  // common / shared expresions aslo used in 'optional' versions
  const shared = {
    allText: /a-zA-Z0-9 _.,?!:;'""'()&%#@\-\+]+/g,
    phoneNumber: /^(?:(?:\(?(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?(?:\(?0\)?[\s-]?)?)|(?:\(?0))(?:(?:\d{5}\)?[\s-]?\d{4,5})|(?:\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3}))|(?:\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4})|(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}))(?:[\s-]?(?:x|ext\.?|\#)\d{3,4})?$/,
  };

  let expression = {

    // RegEx valdations
    url: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    email: /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    number: /^\d+$/,
    day: /^(0?[1-9]|[12][0-9]|3[01])$/,
    month: /^(0[1-9]|1[012])$/,
    year: /^(?:(?:18|19|20)[0-9]{2})$/,
    monthYear: /^(0[1-9]|1[012])\/(?:(?:18|19|20)[0-9]{2})$/,
    dayMonthYear: /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/,
    phoneNumber: shared.phoneNumber,
    telephone: /^\s*\(?(020[78]?\)? ?[1-9][0-9]{2,3} ?[0-9]{4})$|^(0[1-8][0-9]{3}\)? ?[0-9][0-9]{2} ?[0-9]{3})\s*$/,
    mobile: /^(07\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3}$/,
    digits: /^\d+$/,
    postCode: /^((([A-PR-UWYZ])([0-9][0-9A-HJKS-UW]?))|(([A-PR-UWYZ][A-HK-Y])([0-9][0-9ABEHMNPRV-Y]?))\s{0,2}(([0-9])([ABD-HJLNP-UW-Z])([ABD-HJLNP-UW-Z])))|(((GI)(R))\s{0,2}((0)(A)(A)))$/i,
    sortCode: /^(\d){2}-(\d){2}-(\d){2}$/,

    // dob: /^(((0[1-9]|[12][0-9]|30)[/]?(0[13-9]|1[012])|31[/]?(0[13578]|1[02])|(0[1-9]|1[0-9]|2[0-8])[-/]?02)[-/]?[0-9]{4}|29[-/]?02[-/]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/,
    // will be internally held as ISO formatt YYYY-MM-DD
    dob: /^([0-9]{4}[-/]?((0[13-9]|1[012])[-/]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[-/]?31|02[-/]?(0[1-9]|1[0-9]|2[0-8]))|([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00)[-/]?02[-/]?29)$/,

    accountNumber: /^(\d){8}$/,
    companyNumber : /^((GB)?[\d]{8}|(SC)?[\d]{6})$/i,
    gbCompanyNumber : /^(GB)?[\d]{8}$/i,
    scCompanyNumber : /^(SC)?[\d]{6}$/i,
    charityNumber : /^[\d]{8}$/i,

    // *** TEST - DO NOT USE ***
    noneReqDigits: RegExpNotRequired(/^\d+$/),

    // Validation Functions
    noop: function() {
      return true;
    },
    required: function(value) {
      if (typeof value === 'undefined') {
        return false;
      } else if (typeof value === 'string' && value.length === 0) {
        return false;
      }
      return true;
    },
    optionalPhoneNumber: function(value) {
      var regexp = shared.phoneNumber;
      if(!value || value.length===0) {
        return true;
      }
      return regexp.test(value);
    },
    optionalText: function(value) {
      var regexp = shared.allText;
      if(!value || value.length===0) {
        return true;
      }
      return regexp.test(value);
    },
    length: function(value, scope, element, attrs, param) {
      return value && value.length === param;
    },
    minLength: function(value, scope, element, attrs, param) {
      return value && value.length >= param;
    },
    maxLength: function(value, scope, element, attrs, param) {
      return !value || value.length <= param;
    },
    minValue: function(value, scope, element, attrs, param) {
      return !value || (value && parseInt(value,10) >= parseInt(param,10));
    },
    maxValue: function(value, scope, element, attrs, param) {
      return !value || (value && parseInt(value,10) <= parseInt(param,10));
    },
    minFloat: function(value, scope, element, attrs, param) {
      return !value || (value && parseFloat(value,10) >= parseFloat(param,10));
    },
    maxFloat: function(value, scope, element, attrs, param) {
      return !value || (value && parseFloat(value,10) <= parseFloat(param,10));
    },
    minMonthYear: function(value) {
      try {
        let parts = value.split('/');
        let dt = new Date( parts[1], parseInt(parts[0],10)-1, 1); // first of month
        let then = new Date(1800,0,1);
        return then.getTime() < dt.getTime();
      } catch(e) {
        return false;
      }
    },
    minThisMonthYear: function(value) {
      try {
        let parts = value.split('/');
        let dt = new Date( parts[1], parseInt(parts[0],10)-1, 1); // first of month
        let now = new Date();
        return dt.getTime() >= now.getTime();
      } catch(e) {
        return false;
      }
    },
    maxThisMonthYear: function(value) {
      try {
        let parts = value.split('/');
        let dt = new Date( parts[1], parseInt(parts[0],10)-1, 1); // first of month
        let now = new Date();
        return dt.getTime() < now.getTime();
      } catch(e) {
        return false;
      }
    },
    minToday: function(value) {
      try {
        let parts = value.split('/');
        let dt = new Date( parts[2], parseInt(parts[1],10)-1, parts[0]); // first of month
        let then = new Date( 1800,0,1);
        return then.getTime() < dt.getTime();
      } catch(e) {
        return false;
      }
    },
    maxToday: function(value) {
      try {
        let parts = value.split('/');
        let dt = new Date( parts[2], parseInt(parts[1],10)-1, parts[0]); // first of month
        let now = new Date();
        return dt.getTime() < now.getTime();
      } catch(e) {
        return false;
      }
    },

    // value expcted in the form 'yyyy-MM-dd'
    notFutureDate: function( value )  {
      try {
        let dt = new Date(value);
        let now = new Date();
        return dt.getTime() <= now.getTime();
      } catch(e) {
        return false;
      }
    },
    // value expcted in the form 'yyyy-MM-dd'
    futureDate: function( value )  {
      try {
        let dt = new Date(value);
        let now = new Date();
        return dt.getTime() >= now.getTime();
      } catch(e) {
        return false;
      }
    },

    // minYearsOld - must be 18 years old
    // value expcted in the form 'yyyy-MM-dd'
    minYearsOld: function(value, scope, element, attrs, param) {
      try {
        let dt = new Date(value);
        let now = new Date();
        let limit = parseFloat(param,10);

        let years = now.getFullYear() - dt.getFullYear() - limit;
        let months = now.getMonth() - dt.getMonth();
        let days = now.getDate() - dt.getDate();

        if ( years > 0 || (years === 0 && months > 0)) {
          return true;
        }  else if (years < 0 || (years === 0 && months < 0)) {
          return false;
        } else {
          return days >= 0;
        }
      } catch(e) {
        return false;
      }
    },

    // maxYearsOld - must be less than 99 years old
    // value expcted in the form 'yyyy-MM-dd'
    maxYearsOld: function(value, scope, element, attrs, param) {
      try {
        let dt = new Date(value);
        let now = new Date();
        let limit = parseFloat(param,10);

        let years = now.getFullYear() - dt.getFullYear() - limit;
        let months = now.getMonth() - dt.getMonth();
        let days = now.getDate() - dt.getDate();

        if ( years < 0 || (years === 0 && months < 0)) {
          return true;
        }  else if (years > 0 || (years === 0 && months > 0)) {
          return false;
        } else {
          return days <= 0;
        }
      } catch(e) {
        return false;
      }
    },

    // movedIn < YourAge  - cannot move into a property before you were born

    // at least one checkbox
    atLeastOneChecked: function(value, scope) { // , element, attrs, param) {
      if ( !scope.model || !scope.name) {
        return true;
      }
      // get the set to be itterated
      let model = scope.model[scope.name];
      let flag=false;
      for(let key in model){
        if(model[key]){
          flag=true;
        }
      }
      return flag;
    },
  };

  // Dont need messages, we'll use ng-messages for this
  var defaultMsg = {
    url: {
      error: 'please enter a valid formatted URL', success: ''
    },
    email: {
      error: 'Please enter a valid email address', success: ''
    },
    number: {
      error: 'Please enter digits only', success: ''
    },
    day: {
      error: 'Please enter a day value between 1 and 31', success: ''
    },
    month: {
      error: 'Please enter a month value between 1 and 12', success: ''
    },
    year: {
      error: 'Please enter a year later than 1799', success: ''
    },
    monthYear: {
      error: 'Please enter a valid month and year (MM/YYYY)', success: ''
    },
    dayMonthYear: {
      error: 'Please enter a valid day, month and year (DD/MM/YYYY)', success: ''
    },
    optionalPhoneNumber: {
      error: 'Please enter a valid UK telephone or mobile number with dialing code', success: ''
    },
    phoneNumber: {
      error: 'Please enter a valid UK telephone or mobile number with dialing code', success: ''
    },
    telephone: {
      error: 'Please enter a valid UK telephone number with dialing code', success: ''
    },
    mobile: {
      error: 'Please enter a valid UK mobile number', success: ''
    },
    digits: {
      error: 'Please enter digits only', success: ''
    },
    postCode: {
      error: 'Please enter a valid UK postcode', success: ''
    },
    sortCode: {
      error: 'Please enter a Bank Sort Code', success: ''
    },
    dob: {
      error: 'Please enter a valid date of birth', success: ''
    },
    accountNumber: {
      error: 'Please enter a bank account code', success: ''
    },
    companyNumber: {
      error: '', success: ''
    },
    gbCompanyNumber: {
      error: 'Please enter a GB Company Number such as (GB)12345678', success: ''
    },
    scCompanyNumber: {
      error: 'Please enter a Scotish Company Number such as SC123456', success: ''
    },
    charityNumber: {
      error: 'Please enter a UK Registered Charity Number', success: ''
    },
    noop: {
      error: '', success: ''
    },
    required: {
      error: 'This value is required.', success: ''
    },
    optionalText: {
      error: 'Only enter valid text characters', success: ''
    },
    length: {
      error: '', success: ''
    },
    minLength: {
      error: '', success: ''
    },
    maxLength: {
      error: '', success: ''
    },
    minValue: {
      error: '', success: ''
    },
    maxValue: {
      error: '', success: ''
    },
    minFloat: {
      error: '', success: ''
    },
    maxFloat: {
      error: '', success: ''
    },
    minMonthYear: {
      error: 'Please enter a MM/YYYY that is after 01/1800', success: ''
    },
    minThisMonthYear: {
      error: 'Please enter a MM/YYYY that is after today\'s date', success: ''
    },
    maxThisMonthYear: {
      error: 'Please enter a MM/YYYY that is before today\'s date', success: ''
    },
    minToday: {
      error: 'Please enter a DD/MM/YYYY that is after today\'s date', success: ''
    },
    maxToday: {
      error: 'Please enter a DD/MM/YYYY that is before today\'s date', success: ''
    },
    notFutureDate: {
      error: 'Please enter a Date that is not in the future', success: ''
    },
    futureDate: {
      error: 'Please enter a Date that is in the future', success: ''
    },
    minYearsOld: {
      error: 'You must be at least xx years old', success: ''
    },
    maxYearsOld: {
      error: 'You must be at less than xx years old', success: ''
    },
    atLeastOneChecked:{
      error: 'You must select at least one of these inputs', success: ''
    },
  };

  // include the new validations
  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);

  // Dont show validation messages, we'll use ng-messages for this
  $validationProvider.showSuccessMessage = false; // or true(default)
  $validationProvider.showErrorMessage = false;   // or true(default)
}
