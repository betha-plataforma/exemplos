import angular from 'angular';

export const COMPONENTS_MODULE_NAME = 'app.components';

import Menu1Directive from './menu1.directive';
import Menu2Directive from './menu2.directive';
import Menu3Directive from './menu3.directive';

angular
  .module(COMPONENTS_MODULE_NAME, [])
  .directive('appMenu1', Menu1Directive)
  .directive('appMenu2', Menu2Directive)
  .directive('appMenu3', Menu3Directive);
