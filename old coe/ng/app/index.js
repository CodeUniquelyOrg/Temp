import angular from 'angular';

import constantsService from 'services/constants.service';
import utilitiesService from 'services/utils.service';

// top level styling
import 'style/overrides.scss';
import 'style/container.scss';
import 'style/app.scss';
import 'style/blur.scss';

// Pull in the various pages
import pages from 'code/pages';

// components used in app template
// import spinner from 'components/spinner';
import header from 'components/header';
import logo from 'components/logo';

// Application specific overrides for styles
import 'style/app.scss';

// app routing
import routing from './routing';

export default angular.module('myApp.app', [ constantsService, utilitiesService, pages, header, logo ])
  .config(routing)
  .name;
