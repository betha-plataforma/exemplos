function Menu1Controller($http, $scope, $window, SessionService) {
  const vm = this;

  vm.items = [];
  vm.form = {};
  vm.loading = false;
  vm.error = null;
  vm.permissions = {};

  vm.refreshPermissions = function refreshPermissions() {
    vm.permissions = {
      read: SessionService.can('menu1', 'read'),
      create: SessionService.can('menu1', 'create'),
      edit: SessionService.can('menu1', 'edit'),
      delete: SessionService.can('menu1', 'delete'),
    };
  };

  vm.load = function load() {
    vm.refreshPermissions();
    if (!vm.permissions.read) {
      return;
    }
    vm.loading = true;
    vm.error = null;
    $http.get('/api/examples')
      .then(response => { vm.items = response.data; })
      .catch(error => {
        vm.error = error.data && error.data.message || 'Não foi possível consultar os registros.';
        SessionService.notifyError(error);
      })
      .finally(() => { vm.loading = false; });
  };

  vm.create = function create() {
    if (!vm.permissions.create || !vm.form.description) {
      return;
    }
    vm.error = null;
    $http.post('/api/examples', { description: vm.form.description })
      .then(() => {
        vm.form.description = '';
        vm.load();
      })
      .catch(error => {
        vm.error = error.data && error.data.message || 'Não foi possível incluir o registro.';
        SessionService.notifyError(error);
      });
  };

  vm.edit = function edit(item) {
    if (!vm.permissions.edit) {
      return;
    }
    const description = $window.prompt('Nova descrição', item.description);
    if (!description || description === item.description) {
      return;
    }
    vm.error = null;
    $http.put('/api/examples/' + item.id, { description })
      .then(vm.load)
      .catch(error => {
        vm.error = error.data && error.data.message || 'Não foi possível alterar o registro.';
        SessionService.notifyError(error);
      });
  };

  vm.remove = function remove(item) {
    if (!vm.permissions.delete || !$window.confirm('Excluir "' + item.description + '"?')) {
      return;
    }
    vm.error = null;
    $http.delete('/api/examples/' + item.id)
      .then(vm.load)
      .catch(error => {
        vm.error = error.data && error.data.message || 'Não foi possível excluir o registro.';
        SessionService.notifyError(error);
      });
  };

  $scope.$on('betha:session-changed', vm.load);
  vm.load();
}

Menu1Controller.$inject = ['$http', '$scope', '$window', 'SessionService'];

export default () => ({
  bindToController: true,
  controller: Menu1Controller,
  controllerAs: 'vm',
  template: `
    <h4>Cadastro de exemplos</h4>
    <div class="permissions-note">
      Esta tela demonstra permissões independentes de consulta, inclusão, alteração e exclusão definidas no Gerenciador de Acessos.
    </div>

    <form class="crud-toolbar" ng-submit="vm.create()" ng-if="vm.permissions.create">
      <label>
        Descrição
        <input class="form-control" type="text" ng-model="vm.form.description" required maxlength="120">
      </label>
      <button class="btn btn-primary" type="submit">Incluir</button>
    </form>

    <p ng-if="vm.loading">Carregando registros…</p>
    <p class="integration-error" ng-if="vm.error">{{ vm.error }}</p>

    <table class="crud-table" ng-if="!vm.loading && vm.permissions.read">
      <thead><tr><th>ID</th><th>Descrição</th><th class="actions">Ações</th></tr></thead>
      <tbody>
        <tr ng-repeat="item in vm.items track by item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.description }}</td>
          <td class="actions">
            <button class="btn btn-default btn-sm" type="button" ng-if="vm.permissions.edit" ng-click="vm.edit(item)">Alterar</button>
            <button class="btn btn-danger btn-sm" type="button" ng-if="vm.permissions.delete" ng-click="vm.remove(item)">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
});
