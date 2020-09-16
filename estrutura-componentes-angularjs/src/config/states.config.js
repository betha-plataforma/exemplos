export default function routes($stateProvider) {

  $stateProvider.state('root', {
    url: '',
    redirectTo: 'root.home'
  });

  $stateProvider.state('root.menu1', {
    url: '/menu1',
    template: '<app-menu1></app-menu1>'
  });

  $stateProvider.state('root.menu2', {
    url: '/menu2',
    template: '<app-menu2></app-menu2>'
  });

  $stateProvider.state('root.menu3', {
    url: '/menu3',
    template: '<app-menu3></app-menu3>'
  });

};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
