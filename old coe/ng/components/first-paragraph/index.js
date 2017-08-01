//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// First Paragraph directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.first-paragraph', [])
  .directive('firstParagraph', directive)
  .name;
