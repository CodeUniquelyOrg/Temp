// ==========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Link Button Controller
// ==========================================================
export default class LinkButtonController {

  /* @ngInject */
  constructor($rootScope, $scope, UtilsService) {
    this.$rootScope = $rootScope;
    this.$scope = $scope;
    $scope.isDisabled = UtilsService.toBoolean($scope.disabled);
    if (!$scope.direction && !$scope.direction) {
      $scope.direction = 'right';
    }
  }
}
