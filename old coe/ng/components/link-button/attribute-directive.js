//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// click-navigate attribute directive
//

/* @ngInject */
export default function($window) {
  return {
    restrict: 'A',
    link( scope, element, attrs) {
      let path;
      attrs.$observe( 'clickNavigate', url => {
        path = url;
      });
      element.bind( 'click', () => {
        scope.$apply( () => {
          $window.location.href = path;
          // $location.path( path );
        });
      });
    }
  };
}
