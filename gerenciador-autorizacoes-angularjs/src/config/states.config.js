export default function routes($stateProvider, $urlRouterProvider) {

  $stateProvider.state('root', {
    url: '',
    redirectTo: 'root.menu1'
  });

  $stateProvider.state('root.menu1', {
    url: '/menu1',
    template: '<app-menu1></app-menu1>',
    data: { capability: 'menu1' }
  });

  $stateProvider.state('root.menu2', {
    url: '/menu2',
    template: '<app-menu2></app-menu2>',
    data: { capability: 'menu2' }
  });

  $stateProvider.state('root.menu3', {
    url: '/menu3',
    template: '<app-menu3></app-menu3>',
    data: { capability: 'menu3' }
  });

  $stateProvider.state('root.technicalSupport', {
    url: '/suporte-tecnico',
    template: '<app-technical-support></app-technical-support>',
    data: { role: 'support' }
  });

  $stateProvider.state('root.forbidden', {
    url: '/sem-permissao',
    template: '<app-forbidden></app-forbidden>'
  });

  $urlRouterProvider.otherwise('/menu1');

};

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
