//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Configure the URL Router Provider
//

/* @ngInject */
export default function config($urlRouterProvider) {
  $urlRouterProvider.otherwise( $injector => {
    var $state = $injector.get('$state');
    $state.go('app.portal.page0');
  });
}
