/* global require */
/*
 * This file is a part of Portal Application.
 * Written my Steve Saxton <steves@codeuniquely.co.uk>
 */

import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import ngResource from 'angular-resource';
import ngMessages from 'angular-messages';
import uiRouter from 'angular-ui-router';
import uiSelect from 'ui-select';

// Global services
import spinnerService from 'services/spinner.service';      // display spinner whilst navigating

// Configuration
import html5 from './config/html5';
import routes from './config/routes';
import select from './config/ui-select';
import compile from './config/compile';
import storage from './config/storage';
import inteceptors from './config/inteceptors';
import validation from './config/validation';

// import es6 shimmed modules
import { ngStorage } from './shim';

// include plain old angular modules - that hook module
import 'angular-validation';

// Pull in the pages for the application
import pages from 'code/app';

// Load Promise globally
var Promise = require('bluebird'); // eslint-disable-line no-unused-vars

angular.module('myApp', [
  ngSanitize, ngResource, 'validation', ngMessages, ngStorage.name, uiRouter, uiSelect, spinnerService, pages ])
  .config(routes)
  .config(compile)
  .config(inteceptors)
  .config(html5)
  .config(select)
  .config(storage)
  .config(validation)
  ;