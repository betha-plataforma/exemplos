function TechnicalSupportController($http, $scope, SessionService) {
  const vm = this;
  vm.accesses = [];
  vm.loading = false;
  vm.error = null;

  vm.load = function load() {
    vm.loading = true;
    vm.error = null;
    $http.get('/api/support/accesses')
      .then(response => {
        const payload = response.data;
        vm.accesses = Array.isArray(payload)
          ? payload
          : payload.content || payload.items || payload.data || [];
      })
      .catch(error => {
        vm.error = error.data && error.data.message || 'Não foi possível consultar os acessos do contexto.';
        SessionService.notifyError(error);
      })
      .finally(() => { vm.loading = false; });
  };

  vm.user = function user(access) {
    return access.user && (access.user.name || access.user.id || access.user.login)
      || access.user || access.username || '-';
  };

  vm.isAdmin = access => !!access.admin;
  vm.isTechnical = access => !!access.technical;

  $scope.$on('betha:session-changed', vm.load);
  vm.load();
}

TechnicalSupportController.$inject = ['$http', '$scope', 'SessionService'];

export default () => ({
  bindToController: true,
  controller: TechnicalSupportController,
  controllerAs: 'vm',
  template: `
    <h4>Consulta técnica de acessos</h4>
    <div class="permissions-note">
      Esta é uma função de suporte somente para consulta. Ela permite identificar quem possui
      acesso ao contexto atual, mas não concede, altera ou remove acessos.
    </div>

    <p ng-if="vm.loading">Consultando acessos…</p>
    <p class="integration-error" ng-if="vm.error">{{ vm.error }}</p>

    <table class="crud-table" ng-if="!vm.loading && !vm.error">
      <thead><tr><th>Usuário</th><th>Administrador</th><th>Técnico</th></tr></thead>
      <tbody>
        <tr ng-repeat="access in vm.accesses track by (access.id || $index)">
          <td>{{ vm.user(access) }}</td>
          <td>{{ vm.isAdmin(access) ? 'Sim' : 'Não' }}</td>
          <td>{{ vm.isTechnical(access) ? 'Sim' : 'Não' }}</td>
        </tr>
        <tr ng-if="!vm.accesses.length"><td colspan="3">Nenhum acesso encontrado no contexto.</td></tr>
      </tbody>
    </table>
  `,
});
