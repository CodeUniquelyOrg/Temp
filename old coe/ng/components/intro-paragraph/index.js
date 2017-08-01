//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Intro-Paragraph directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

export default angular.module('myApp.intro-paragraph', [])
  .directive('introParagraph', directive)
  .name;
