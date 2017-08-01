//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Loads the templates and pages for this appliction.
//
import indexTemplate from './index.html';

const stateInsertPoint = 'app.portal';

/* @ngInject */
export default function routes($stateProvider) {

  $stateProvider
    .state(stateInsertPoint, {
      url: '/portal',
      abstract: true,
      views: {
        '' : {
          template: indexTemplate
        }
      },
      resolve: {
        UniqueIdService: 'UniqueIdService',
        ModelService: 'ModelService',
      }
    });

    // .state(stateInsertPoint, {
    //   url: '/portal',
    //   abstract: true,
    //   resolve: {
    //     ModelService: 'ModelService',
    //   }
    // });

}
