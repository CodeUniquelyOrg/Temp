//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Application httpProvider config
//

// Inject All our inteceptors
/* @ngInject */
export default function($httpProvider) {
  $httpProvider.interceptors.push( 'SpinnerService' );
}
