//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Application $locationProvider configuration
//

/* @ngInject */
export default function config($locationProvider) {
  $locationProvider.html5Mode(false);
}
