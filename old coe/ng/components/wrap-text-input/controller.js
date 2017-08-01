// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Wrap Text Input Controller
// ==========================================================
const defaultMessage = 'please enter valid input';

export default class TextInputController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$scope = $scope;

    $scope.length = $scope.length || 50;

    // set these up before the link function is called
    $scope.isDebug = UtilsService.toBoolean($scope.debug);
    $scope.isRequired = UtilsService.toBoolean($scope.required, true);
    $scope.initialMessage = $scope.validationMessage || defaultMessage;

    $scope.validation = $scope.validation || 'noop';

    // $scope.defaultMessage = $scope.validationMessage || defaultMessage;
    if ($scope.help) {
      // const json = JSON.parse($scope.help);
      // const value = json[$scope.name];
      $scope.helptext = $scope.help;
    }

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
