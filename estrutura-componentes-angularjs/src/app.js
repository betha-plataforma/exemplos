import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { applyPolyfills, defineCustomElements } from '../node_modules/@betha-plataforma/estrutura-componentes/loader';

import './assets';

import setupStates from './config/states.config'
import setupApp from './config/app.config'
import setupConfig from './config/cors.config'

import { COMPONENTS_MODULE_NAME } from './components'

export default angular
  .module('app', [
    uiRouter,
    COMPONENTS_MODULE_NAME
  ])
  .config(setupStates)
  .config(setupApp)
  .config(setupConfig)
  .run(['$log', '$state', '$transitions', '$document', function ($log, $state, $transitions, $document) {

    applyPolyfills().then(function () {
      defineCustomElements(window);
    });

    (async () => {
      await customElements.whenDefined('bth-app');

      function getAuthorization() {
        return {
          accessId: '5e613debe191120137316351',
          accessToken: 'fbbbbffd-eeb4-4f7c-b222-8097e55e28fa',
          systemId: 78
        };
      }

      async function handleUnauthorizedAccess() {
        // Simula uma requisição para renovar o token
        return new Promise(function (resolve) {
          setTimeout(resolve, 3500);
        });
      }

      var authorization = {
        getAuthorization: getAuthorization,
        handleUnauthorizedAccess: handleUnauthorizedAccess,
      }

      var appElement = document.querySelector('bth-app');

      var opcoesMenu = [
        { id: 'menu1', descricao: 'Menu 1', icone: 'chart-pie', rota: 'root.menu1', possuiPermissao: true },
        {
          id: '', descricao: 'Menu 2', icone: 'cog', possuiPermissao: true,
          submenus: [
            { id: 'menu2', descricao: 'Submenu 1', rota: 'root.menu2', possuiPermissao: true },
            { id: 'menu3', descricao: 'Submenu 2', rota: 'root.menu3', possuiPermissao: true },
          ]
        },
      ];

      function setMenuAtivoPorRota() {
        opcoesMenu.forEach(function (opcao) {
          if (opcao.rota === $state.current.name) {
            appElement.setMenuAtivo(opcao.id);
          }

          if (opcao.submenus) {
            opcao.submenus.forEach(function (subItem) {
              if ($state.includes(subItem.rota)) {
                appElement.setMenuAtivo(subItem.id);
              }
            });
          }
        });
      }

      appElement.opcoes = opcoesMenu;
      appElement.addEventListener('opcaoMenuSelecionada', function navegar(event) {
        $state.go(event.detail.rota);
      });

      setMenuAtivoPorRota();

      $transitions.onSuccess({}, function onTransitionSuccess() {
        $log.debug('onTransitionSuccess', $state.current.name, $state.current.url);
        setMenuAtivoPorRota();
      });

      var marcaProdutoElement = document.querySelector('bth-marca-produto');
      marcaProdutoElement.authorization = authorization;

      var contaUsuarioElement = document.querySelector('bth-conta-usuario');
      contaUsuarioElement.addEventListener('logout', function logout() {
        console.debug('O usuário realizou a ação de logout no componente de conta do usuário');
      });

      const isUrl = text => {
        try {
          new URL(text);
          return true;
        } catch (err) {
          return false;
        }
      }

      var utilitariosElement = document.querySelector('bth-utilitarios');

      utilitariosElement.utilitarios = [
        { nome: 'Gerenciador de Acessos', rota: 'root.menu3', icone: 'key-variant', possuiPermissao: true, },
        { nome: 'Link externo', rota: 'https://aws.amazon.com/pt/console/', icone: 'amazon', possuiPermissao: true },
        { nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit', rota: 'root.menu1', icone: 'merge', possuiPermissao: true, },
      ];

      utilitariosElement.addEventListener('opcaoUtilitarioSelecionada', function navegar(event) {
        if (isUrl(event.detail.rota)) {
          window.open(event.detail.rota, '_blank')
          return;
        }

        $state.go(event.detail.rota);
      });

      var notificacoesElement = document.querySelector('bth-notificacoes');
      notificacoesElement.authorization = authorization;

      notificacoesElement.addEventListener('novaNotificacaoComLink', (data) => {
        console.log('Nova mensagem obtida no componente de notificações', data.detail);
      });

      var novidadesElement = document.querySelector('bth-novidades');
      novidadesElement.authorization = authorization;

    })();

  }])
  .name;
