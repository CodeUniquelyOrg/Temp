// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Month Year Controller
// ==========================================================
const defaultMessage = 'Please enter a valid Month and Year';

export default class MonthYearController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$scope = $scope;

    // set these up before the link function is called
    $scope.isDebug = UtilsService.toBoolean($scope.debug);
    $scope.isRequired = UtilsService.toBoolean($scope.required, true);
    $scope.validation = $scope.validation || 'monthYear';
    $scope.validationMessage = $scope.validationMessage || defaultMessage;

    this.bindFunctions();
  }

  bindFunctions() {
    this.$scope.invalidMsg = this.invalidMsg.bind(this);
  }

  invalidMsg(msg) {
    if (msg !== '') {
      this.$scope.validationMessage = msg;
    } else {
      this.$scope.validationMessage = defaultMessage;
    }
  }
}
