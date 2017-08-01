// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Number Controller
// ==========================================================
const defaultMessage = 'please enter a valid number';

export default class NumberController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$scope = $scope;

    // not allowed to enter more than 999,999,999,999,999
    $scope.length = $scope.length || 15;

    // set these up before the link function is called
    $scope.isDebug = UtilsService.toBoolean($scope.debug);
    $scope.isRequired = UtilsService.toBoolean($scope.required, true);
    $scope.initialMessage = $scope.validationMessage || defaultMessage;
    // $scope.defaultMessage = $scope.validationMessage || defaultMessage;
    this.bindFunctions();
  }

  bindFunctions() {
    this.$scope.invalidMsg = this.invalidMsg.bind(this);
  }

  invalidMsg(msg) {
    if (msg !== '') {
      this.$scope.validationMessageToUse = msg;
    } else {
      this.$scope.validationMessageToUse = this.$scope.validationMessage || defaultMessage; // this.$scope.defaultMessage;
    }
  }
}
