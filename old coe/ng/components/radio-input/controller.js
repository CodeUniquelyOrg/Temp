// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Number Controller
// ==========================================================
const defaultMessage = 'Please select at least one entry';

export default class NumberController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$scope = $scope;

    // set these up before the link function is called
    $scope.isRequired = UtilsService.toBoolean($scope.required, true);
    $scope.isDebug = UtilsService.toBoolean($scope.debug);

    $scope.validation = $scope.validation || 'required';
    // $scope.defaultMessage = $scope.validationMessage || defaultMessage;

    // how does that work on arrays ?
    if ($scope.initial && typeof $scope.model[$scope.name] === 'undefined') {
      const value  = UtilsService.lookupSelectionText($scope.values, $scope.initial);
      $scope.model[$scope.name] = value;
    }

    // Decode this components help text from the JSON passed in $scope
    if ($scope.help) {
      // const json = JSON.parse($scope.help);
      // const value = json[$scope.name];
      $scope.helptext = $scope.help;
    }

    this.bindFunctions();
  }

  bindFunctions() {
    this.$scope.invalidMsg = this.invalidMsg.bind(this);
    this.$scope.onselected = this.onselected.bind(this);
  }

  onselected = () => {
    if (this.$scope.changed) {
      this.$scope.changed();
    }
  };

  invalidMsg(msg) {
    if (msg !== '') {
      this.$scope.validationMessageToUse = msg;
    } else {
      this.$scope.validationMessageToUse = this.$scope.validationMessage || defaultMessage; // this.$scope.defaultMessage;
    }
  }
}
