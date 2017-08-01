// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Accept Input Controller
// ==========================================================
const defaultMessage = 'please enter a valid number';

export default class AcceptInputController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$scope = $scope;

    // default validation messsage
    $scope.validationMessage = 'This input is mandatory';

    // set these up before the link function is called
    $scope.isDebug = UtilsService.toBoolean($scope.debug);
    $scope.isRequired = UtilsService.toBoolean($scope.required, true);
    $scope.initialMessage = $scope.validationMessage || defaultMessage;
    this.bindFunctions();

    // some sort of watch function ???
    this.trackChanges();
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

  trackChanges() {
    let self = this;
    let name = this.$scope.name;
    let watch = `model.${name}`;
    this.$scope.$watch(watch, (current) => {
      let form = self.$scope.form[name];
      form.$setValidity('accepted', current ? current : false );
    });
  }
}
