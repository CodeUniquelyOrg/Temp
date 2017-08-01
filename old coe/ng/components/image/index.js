//
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Image directive
//
import angular from 'angular';

// imports for the component
import directive from './directive';

// styling
// import 'style/image.scss';

export default angular.module('myApp.image', [])
  .directive('imagex', directive)
  .name;
