function Menu3Controller($http, SessionService) {
  const vm = this;
  vm.message = 'Carregando…';
  $http.get('/api/menu3')
    .then(response => { vm.message = response.data.message; })
    .catch(error => {
      vm.message = error.data && error.data.message || 'Acesso não autorizado.';
      SessionService.notifyError(error);
    });
}

Menu3Controller.$inject = ['$http', 'SessionService'];

export default () => ({
  bindToController: true,
  controller: Menu3Controller,
  controllerAs: 'vm',
  template: `
    <h4>Menu 3</h4>
    <p>{{ vm.message }}</p>
  `,
});
