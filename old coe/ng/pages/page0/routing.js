// ===========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// CardNet Page 0
// ===========================================================
import template from './template.html';
import controller from './controller';

const stateInsertPoint = 'app.portal.page0';

/* @ngInject */
export default function routes($stateProvider) {
  $stateProvider
    .state(stateInsertPoint, {
      url: '/page0',
      views: {
        'sub_page@app.portal': {
          template: template,
          controller: controller
        }
      }
    });
}
