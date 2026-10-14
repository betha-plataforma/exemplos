import angular from 'angular';
import uiRouter from '@uirouter/angularjs';

import { applyPolyfills, defineCustomElements } from '../node_modules/@betha-plataforma/estrutura-componentes/loader';

import './assets';

import setupStates from './config/states.config';
import setupApp from './config/app.config';
import setupConfig from './config/cors.config';
import SessionService from './services/session.service';
import { COMPONENTS_MODULE_NAME } from './components';

export default angular
  .module('app', [
    uiRouter,
    COMPONENTS_MODULE_NAME
  ])
  .factory('SessionService', SessionService)
  .config(setupStates)
  .config(setupApp)
  .config(setupConfig)
  .run(['$log', '$rootScope', '$state', '$transitions', '$window', 'SessionService',
    function ($log, $rootScope, $state, $transitions, $window, SessionService) {
      let appElement;
      let marcaProdutoElement;
      let contaUsuarioElement;
      let utilitariosElement;
      let listenersInstalled = false;
      let lastActivityReport = 0;

      const loadingOverlay = document.querySelector('#app-loading');
      const contextOverlay = document.querySelector('#context-selection');
      const restrictionOverlay = document.querySelector('#access-restriction');
      const restrictionTitle = document.querySelector('#restriction-title');
      const restrictionMessage = document.querySelector('#restriction-message');
      const restrictionError = document.querySelector('#restriction-error');
      const termConfirmation = document.querySelector('#term-confirmation');
      const termCheckbox = document.querySelector('#term-checkbox');
      const termAcceptButton = document.querySelector('#term-accept');
      const loginButton = document.querySelector('#restriction-login');

      function hide(element) {
        element.hidden = true;
      }

      function show(element) {
        element.hidden = false;
      }

      function currentExercise() {
        return new URLSearchParams($window.location.search).get('exercicio') || undefined;
      }

      function isUrl(text) {
        try {
          new URL(text);
          return true;
        } catch (error) {
          return false;
        }
      }

      function menuOptions(session) {
        const options = [
          {
            id: 'menu1',
            descricao: 'Cadastro de exemplos',
            icone: 'format-list-bulleted',
            rota: 'root.menu1',
            possuiPermissao: SessionService.can('menu1')
          },
          {
            id: '',
            descricao: 'Outras funcionalidades',
            icone: 'cog',
            possuiPermissao: SessionService.can('menu2') || SessionService.can('menu3'),
            submenus: [
              {
                id: 'menu2',
                descricao: 'Menu 2',
                rota: 'root.menu2',
                possuiPermissao: SessionService.can('menu2')
              },
              {
                id: 'menu3',
                descricao: 'Menu 3',
                rota: 'root.menu3',
                possuiPermissao: SessionService.can('menu3')
              },
            ]
          },
        ];

        if (session.selectedContext && (session.selectedContext.technical || session.selectedContext.admin)) {
          options.push({
            id: 'technical-support',
            descricao: 'Suporte técnico',
            icone: 'account-search',
            rota: 'root.technicalSupport',
            possuiPermissao: true
          });
        }
        return options;
      }

      function setActiveMenu() {
        if (!appElement || !appElement.opcoes) {
          return;
        }

        function activate(option) {
          if (!option.possuiPermissao) {
            return;
          }

          Promise.resolve(appElement.setMenuAtivo(option.id))
            .catch(error => $log.error('Não foi possível marcar a opção de menu como ativa.', error));
        }

        for (const option of appElement.opcoes) {
          if (option.rota === $state.current.name) {
            activate(option);
            return;
          }
          for (const submenu of option.submenus || []) {
            if ($state.includes(submenu.rota)) {
              activate(submenu);
              return;
            }
          }
        }
      }

      function navigateToFirstAllowed() {
        const candidates = [
          ['menu1', 'root.menu1'],
          ['menu2', 'root.menu2'],
          ['menu3', 'root.menu3'],
        ];
        const allowed = candidates.find(candidate => SessionService.can(candidate[0]));
        $state.go(allowed ? allowed[1] : 'root.forbidden')
          .catch(error => $log.error('Não foi possível navegar para uma rota permitida.', error));
      }

      function configureProducts(session) {
        const selected = session.selectedContext;
        marcaProdutoElement.exibirProdutos = false;
        if (!selected) {
          return;
        }
        marcaProdutoElement.userAccountsApi = $window.location.origin + '/api/betha/user-accounts';
        marcaProdutoElement.authorization = {
          getAuthorization: function getAuthorization() {
            return {
              accessId: selected.accessId,
              accessToken: 'bff-session',
              systemId: session.systemId
            };
          },
          handleUnauthorizedAccess: function handleUnauthorizedAccess() {
            return SessionService.verify();
          }
        };
        $window.setTimeout(() => { marcaProdutoElement.exibirProdutos = true; });
      }

      function configureUtilities(session) {
        const options = [];
        if (session.contexts.length > 1) {
          options.push({
            nome: 'Trocar entidade',
            rota: 'context://select',
            icone: 'swap-horizontal',
            possuiPermissao: true
          });
        }
        if (session.managerUrl) {
          options.push({
            nome: 'Gerenciador de Acessos',
            rota: session.managerUrl,
            icone: 'key-variant',
            possuiPermissao: true
          });
        }
        utilitariosElement.utilitarios = options;
      }

      function configureAccount(session) {
        contaUsuarioElement.usuario = session.user.id;
        contaUsuarioElement.nome = session.user.name || session.user.id;
        contaUsuarioElement.fotoUrl = session.user.photoUrl;
      }

      function renderSession(session) {
        if (!session.selectedContext) {
          if (session.contexts.length > 0) {
            showContextSelection(session);
          } else {
            showRestriction({
              code: 'NO_SYSTEM_ACCESS',
              message: 'Seu usuário não possui um acesso válido para este sistema.'
            });
          }
          hide(loadingOverlay);
          return false;
        }

        hide(contextOverlay);
        hide(loadingOverlay);
        configureAccount(session);

        if (!session.selectedContext.accepted) {
          appElement.opcoes = [];
          marcaProdutoElement.exibirProdutos = false;
          utilitariosElement.utilitarios = [];
          showTerm();
          return false;
        }

        hide(restrictionOverlay);
        configureProducts(session);
        configureUtilities(session);
        appElement.opcoes = menuOptions(session);

        const currentCapability = $state.current.data && $state.current.data.capability;
        const currentRole = $state.current.data && $state.current.data.role;
        const supportAccess = session.selectedContext.technical || session.selectedContext.admin;
        if ((currentRole === 'support' && !supportAccess)
          || (!currentRole && (!currentCapability || !SessionService.can(currentCapability)))) {
          navigateToFirstAllowed();
          return true;
        }
        setActiveMenu();
        return true;
      }

      function showContextSelection(session) {
        const selector = document.querySelector('#betha-context-selector');
        selector.buscar = function buscar() {
          return Promise.resolve(session.contexts.map(context => ({
            id: context.accessId,
            descricao: context.description,
            complemento: context.complement,
            icone: 'domain'
          })));
        };
        selector.selecionar = function selecionar(item) {
          show(loadingOverlay);
          hide(contextOverlay);
          return SessionService.selectContext(item.id, currentExercise())
            .then(nextSession => {
              if (!renderSession(nextSession)) {
                return false;
              }
              return SessionService.verify().then(() => true);
            })
            .then(ready => ready ? SessionService.activity() : null)
            .catch(error => {
              if (!error || (error.status !== 401 && error.status !== 403)) {
                showRequestError(error, 'Não foi possível selecionar o contexto de acesso.');
              }
            });
        };
        show(contextOverlay);
      }

      function resetRestriction() {
        restrictionError.textContent = '';
        hide(restrictionError);
        hide(termConfirmation);
        hide(termAcceptButton);
        termCheckbox.checked = false;
        termAcceptButton.disabled = true;
      }

      function showRestriction(restriction) {
        resetRestriction();
        hide(loadingOverlay);
        hide(contextOverlay);
        restrictionTitle.textContent = 'Acesso indisponível';
        restrictionMessage.textContent = restriction.message || 'A Plataforma Betha bloqueou este acesso.';
        const details = [];
        if (restriction.code) {
          details.push('Código: ' + restriction.code);
        }
        if (restriction.httpStatus) {
          details.push('HTTP ' + restriction.httpStatus);
        }
        if (details.length) {
          restrictionError.textContent = details.join(' · ');
          show(restrictionError);
        }
        show(restrictionOverlay);
      }

      function showRequestError(error, fallbackMessage) {
        const restriction = Object.assign({}, error && error.data || {
          message: fallbackMessage
        });
        if (error && error.status) {
          restriction.httpStatus = error.status;
        }
        showRestriction(restriction);
      }

      function showTerm() {
        resetRestriction();
        hide(loadingOverlay);
        hide(contextOverlay);
        restrictionTitle.textContent = 'Termo de responsabilidade';
        restrictionMessage.textContent = 'Carregando o termo…';
        show(termConfirmation);
        show(termAcceptButton);
        show(restrictionOverlay);

        SessionService.getTerm()
          .then(term => {
            restrictionMessage.textContent = term.text || term.message
              || 'Reconheço o acesso concedido e declaro ciência das responsabilidades de uso.';
          })
          .catch(error => {
            restrictionError.textContent = error.data && error.data.message
              || 'Não foi possível carregar o termo.';
            show(restrictionError);
          });
      }

      function handleRestriction(restriction) {
        const type = restriction.restrictionType || restriction.classificationCode || restriction.type;
        if (type === 'RESTRICTED_TERM_OF_RESPONSIBILITY') {
          showTerm();
          return;
        }
        showRestriction(restriction);
      }

      function installComponentListeners() {
        if (listenersInstalled) {
          return;
        }
        listenersInstalled = true;

        appElement.addEventListener('opcaoMenuSelecionada', event => {
          if (event.detail && event.detail.rota) {
            $state.go(event.detail.rota);
          }
        });

        utilitariosElement.addEventListener('opcaoUtilitarioSelecionada', event => {
          const route = event.detail && event.detail.rota;
          if (route === 'context://select') {
            showContextSelection(SessionService.current());
          } else if (isUrl(route)) {
            $window.open(route, '_blank', 'noopener');
          } else if (route) {
            $state.go(route);
          }
        });

        contaUsuarioElement.addEventListener('logout', () => {
          SessionService.logout().catch(() => $window.location.assign('/login'));
        });

        termCheckbox.addEventListener('change', () => {
          termAcceptButton.disabled = !termCheckbox.checked;
        });

        termAcceptButton.addEventListener('click', () => {
          if (!termCheckbox.checked) {
            return;
          }
          termAcceptButton.disabled = true;
          SessionService.acceptTerm()
            .then(session => {
              if (!renderSession(session)) {
                return false;
              }
              return SessionService.verify().then(() => true);
            })
            .then(ready => ready ? SessionService.activity() : null)
            .catch(error => {
              if (error && (error.status === 401 || error.status === 403)) {
                return;
              }
              restrictionError.textContent = error.data && error.data.message
                || 'Não foi possível registrar o aceite.';
              show(restrictionError);
              termAcceptButton.disabled = false;
            });
        });

        loginButton.addEventListener('click', () => {
          SessionService.logout().catch(() => $window.location.assign('/login'));
        });
      }

      function installActivityMonitor() {
        const events = ['keypress', 'keydown', 'click', 'mousemove', 'scroll', 'touchmove', 'touchstart'];
        const hasAcceptedContext = function hasAcceptedContext() {
          const currentSession = SessionService.current();
          return !!(currentSession && currentSession.selectedContext
            && currentSession.selectedContext.accepted);
        };
        const report = function report() {
          if (!hasAcceptedContext()) {
            return;
          }
          const now = Date.now();
          if (now - lastActivityReport < 120000) {
            return;
          }
          lastActivityReport = now;
          SessionService.activity().catch(() => {});
        };
        events.forEach(eventName => $window.addEventListener(eventName, report, { passive: true }));
        $window.setInterval(() => {
          if (hasAcceptedContext()) {
            SessionService.verify().catch(() => {});
          }
        }, 60000);
      }

      $transitions.onBefore({ to: state => state.data && (state.data.capability || state.data.role) }, transition => {
        const session = SessionService.current();
        if (!session || !session.selectedContext) {
          return true;
        }
        const data = transition.to().data;
        const selected = session.selectedContext;
        const supportAccess = selected && (selected.technical || selected.admin);
        if ((data.role === 'support' && !supportAccess)
          || (data.capability && !SessionService.can(data.capability))) {
          return transition.router.stateService.target('root.forbidden');
        }
        return true;
      });

      $transitions.onSuccess({}, function onTransitionSuccess() {
        $log.debug('onTransitionSuccess', $state.current.name, $state.current.url);
        setActiveMenu();
      });

      $rootScope.$on('betha:access-restricted', (event, restriction) => handleRestriction(restriction));

      applyPolyfills()
        .then(() => defineCustomElements($window))
        .then(() => Promise.all([
          customElements.whenDefined('bth-app'),
          customElements.whenDefined('bth-selecao-contexto')
        ]))
        .then(() => {
          appElement = document.querySelector('bth-app');
          marcaProdutoElement = document.querySelector('bth-marca-produto');
          contaUsuarioElement = document.querySelector('bth-conta-usuario');
          utilitariosElement = document.querySelector('bth-utilitarios');
          installComponentListeners();
          installActivityMonitor();
          return SessionService.load();
        })
        .then(session => {
          if (renderSession(session)) {
            return SessionService.verify().then(() => SessionService.activity());
          }
          return null;
        })
        .catch(error => {
          if (!error || (error.status !== 401 && error.status !== 403)) {
            showRequestError(error, 'Não foi possível inicializar a integração com a Plataforma Betha.');
          }
        });
    }
  ])
  .name;
