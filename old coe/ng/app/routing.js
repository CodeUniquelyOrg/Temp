// ===========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// App Page
// ===========================================================
import template from './index.html';
import controller from './controller';

const stateInsertPoint = 'app';

/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state( stateInsertPoint, {
      url: '',
      template: template,
      controller:controller,
      resolve: {
        ConstantsService: 'ConstantsService',
        UtilsService: 'UtilsService',
        $options: function(ConstantsService) {
          return ConstantsService.options;
        },
      }
    });
}
