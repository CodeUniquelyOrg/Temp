//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// CardNet Page 0 Controller
//

export default class CardNetPage0Controller {

  /* @ngInject */
  constructor($window, $scope, $state, HitLogService) {

    HitLogService.hitLog('page0');

    this.$window = $window;
    this.$scope = $scope;
    this.$state = $state;

    this.bindFunctions();

    // go to the top of the screen
    $window.scrollTo(0, 0);
  }

  bindFunctions() {
    this.$scope.navigate = this.navigate.bind(this);
  }

  navigate(state) {
    this.$state.go(state, {}, { reload:true } );
  }
}
