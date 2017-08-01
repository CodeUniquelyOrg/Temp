//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// link button directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';
import attributeDirective from './attribute-directive';

// styling
import 'style/buttons.scss';

export default angular.module('myApp.link-button', [])
  .directive('linkButton', directive)
  .directive('clickNavigate', attributeDirective )
  .name;
