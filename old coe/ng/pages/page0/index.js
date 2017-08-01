// ===========================================================
// Written my Steve Saxton <steves@codeuniquely.co.uk>
// Index (Page 0)
// ===========================================================
import angular from 'angular';

// Local modules
import routing from './routing';

import './page.scss';

export default angular.module('myApp.portal.page0', [])
 .config(routing)
 .name;
