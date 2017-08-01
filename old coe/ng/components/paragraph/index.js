//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Paragraph directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

// spacing inside paragraphs
import 'style/paragraph.scss';

export default angular.module('myApp.paragraph', [])
  .directive('paragraph', directive)
  .name;
