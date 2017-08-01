//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Utils Service
//
import angular from 'angular';

class service {

  /* @ngInject */
  constructor($window, $document) {

    this.$window = $window;
    this.$document = $document;
    this.bindFunctions();
  }

  bindFunctions() {
    this.toBoolean = this.toBoolean.bind(this);
    this.formatNumber = this.formatNumber.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.findOffsetPos = this.findOffsetPos.bind(this);
    this.lookupSelection = this.lookupSelection.bind(this);
    this.lookupChecks = this.lookupChecks.bind(this);

    this.saveValid = this.utilityFunctionSaveValid.bind(this);
    this.saveAll = this.utilityFunctionSaveAll.bind(this);
  }

  toBoolean(value, defaultValue=false) {
    if (typeof value === 'undefined') {
      return defaultValue;
    } else if (value==='true') {
      return true;
    } else if (value==='false') {
      return false;
    } else {
      return value;
    }
  }

  pad(s) {
    return (s < 10) ? '0' + s : s;
  }

  getDecimalSeparator() {
    return /\./.test((1.1).toLocaleString())? '.' : ',';
  }

  formatNumber(value) {
    let dp = new RegExp(`\\${this.getDecimalSeparator()}\\d+$`);
    try {
      let text = Number(value).toLocaleString();
      if ( text ) {
        return text.replace(dp,'');  // IE8-10
      }
    } catch(e) {
      return 0;
    }
  }

  formatCurrency(value) {
    return `£${this.formatNumber(value)}`;
  }

  formatDate(date) {
    var d = new Date(date);
    return [this.pad(d.getDate()), this.pad(d.getMonth()+1), d.getFullYear()].join('/');
  }

  formatDateIso(date) {
    var d = new Date(date);
    return [d.getFullYear(), this.pad(d.getMonth()+1), this.pad(d.getDate())].join('-');
  }

  // calculate the relative offset of an elemnt
  findOffsetPos(node) {
    let curtop = 0;
    if ( node ) {
      while (node !== null) {
        if (node.type==='hidden') {
          node = node.parentNode;
        } else {
          curtop += node.offsetTop;
          node = node.offsetParent;
        }
      }
    }
    // windows scrolling offset is ?
    const curtopscroll = this.$window.pageYOffset || 0;
    return curtop - curtopscroll;
  }

  scrollToFirstError() {
    const errInpt = angular.element(this.$document[0].querySelector('input[class*="ng-invalid"],textarea[class*="ng-invalid"]'));
    const offset = this.findOffsetPos(errInpt[0]);
    this.$window.scrollBy(0, offset - 100); // adjust position up by 100px to just above the question
  }

  lookupSelection(data, value) {
    if(typeof value === 'undefined'|| value === null) {
      return value;
    }
    let text = '';
    let check = value.toString();
    for( let entry of data ) {
      if ( entry.value === check ) {
        text = entry.text;
        break;
      }
    }
    return text;
  }

  lookupSelectionText(data, text) {
    if(typeof text === 'undefined'|| text === null) {
      return value;
    }
    let value = '';
    for( let entry of data ) {
      if ( entry.text === text ) {
        value = entry.value;
        break;
      }
    }
    return value;
  }

  lookupChecks(data, value) {
    if(typeof value === 'undefined'|| value === null) {
      return value;
    }
    let text = [];
    data.forEach( entry=> {
      if (value[entry.value] === true) {
        text.push(entry.text);
      }
    });
    return text;
  }

  utilityFunctionSaveValid(model, storedModel, form) {
    for(let key in model) {
      if (angular.isUndefined(model[key])) {
        delete storedModel[key];
      } else {
        // if the form has this key - we can effect it
        if (form[key]) {
          let valid = !!(form[key].$valid);
          if (!valid) {
            delete storedModel[key];
          } else {
            storedModel[key] = model[key];
          }
        }
      }
    }
  }

  utilityFunctionSaveAll(model, storedModel) {
    for(let key in model) {
      if (angular.isUndefined(model[key])) {
        delete storedModel[key];
      } else {
        storedModel[key] = model[key];
      }
    }
  }
}

export default angular.module('myApp.services.utils', [])
  .service('UtilsService', service)
  .name;
