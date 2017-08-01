//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Checkbox Embed directive
//
import angular from 'angular';

// services
import utilsService from 'services/utils.service';

// imports for the component
import directive from './directive';

// spacer styling
import 'style/checkbox-embed.scss';

export default angular.module('myApp.checkbox-embed', [utilsService])
  .directive('checkboxEmbed', directive)
  .name;
