function Menu2Controller($http, SessionService) {
  const vm = this;
  vm.message = 'Carregando…';
  $http.get('/api/menu2')
    .then(response => { vm.message = response.data.message; })
    .catch(error => {
      vm.message = error.data && error.data.message || 'Acesso não autorizado.';
      SessionService.notifyError(error);
    });
}

Menu2Controller.$inject = ['$http', 'SessionService'];

export default () => ({
  bindToController: true,
  controller: Menu2Controller,
  controllerAs: 'vm',
  template: `
    <h4>Menu 2</h4>
    <p>{{ vm.message }}</p>
  `,
});
