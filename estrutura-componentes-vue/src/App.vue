<template>
  <bth-app menu-vertical>
    <bth-marca-produto slot="menu_marca_produto" produto="Vue" exibir-produtos> </bth-marca-produto>

    <bth-utilitarios slot="menu_ferramentas"></bth-utilitarios>
    <bth-ajuda slot="menu_ferramentas"></bth-ajuda>
    <bth-novidades slot="menu_ferramentas"></bth-novidades>
    <bth-notificacoes slot="menu_ferramentas"></bth-notificacoes>
    <bth-conta-usuario slot="menu_ferramentas" usuario="lorem.ipsum" nome="Lorem Ipsum" foto-url="https://placeimg.com/80/80/animals"> </bth-conta-usuario>

    <main slot="container_aplicacao" class="container-fluid mt-2">
      <router-view />
    </main>
  </bth-app>

</template>

<script lang="ts">
import Vue from "vue";

import router from './router'

import { Authorization, OpcaoMenu, Utilitario, OpcaoMenuSelecionadaEvent, OpcaoUtilitarioSelecionadaEvent} from '@betha-plataforma/estrutura-componentes';

const opcoesMenu: Array<OpcaoMenu> =  [
  { id: 'menu1', descricao: 'Menu 1', icone: 'chart-pie', rota: '/', possuiPermissao: true },
  {
    id: '', descricao: 'Menu 2', icone: 'cog', possuiPermissao: true,
    submenus: [
      { id: 'menu2', descricao: 'Submenu 1', rota: '/menu2', possuiPermissao: true },
      { id: 'menu3', descricao: 'Submenu 2', rota: '/menu3', possuiPermissao: true },
    ]
  },
];

const opcoesUtilitarios: Array<Utilitario> = [
  { nome: 'Gerenciador de Acessos', rota: '/menu3', icone: 'key-variant', possuiPermissao: true, },
  { nome: 'Link externo', rota: 'https://aws.amazon.com/pt/console/', icone: 'amazon', possuiPermissao: true },
  { nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit', rota: '/', icone: 'merge', possuiPermissao: true, },
];

let menuElement: HTMLBthAppElement;

export default Vue.extend({
  created: async function() {
    await customElements.whenDefined('bth-app');

    this.configurarApp();
    this.configurarMarcaProduto();
    this.configurarContaUsuario();
    this.configurarUtilitarios();
    this.configurarNotificacoes();
    this.configurarNovidades();
  },
  watch: {
    $route(to) {
      this.setMenuAtivoPorRota(to.path);
    }
  },
  methods: {
   configurarApp() {
      menuElement = document.querySelector('bth-app');
      menuElement.opcoes = opcoesMenu;

      // TODO: Entender pq o Vue não consegue importar a interface do CustomEvent<OpcaoMenuSelecionadaEvent>
      // eslint-disable-next-line
      menuElement.addEventListener('opcaoMenuSelecionada', (event: any) => {
        const detail: OpcaoMenuSelecionadaEvent = event.detail;

        try {
          router.push(detail.rota);
        } catch  {
          // nothing
        }
      });

      this.setMenuAtivoPorRota(router.currentRoute.path);
    },
    setMenuAtivoPorRota(rota: string) {
      opcoesMenu.forEach(opcaoVertical => {
        if (opcaoVertical.rota === rota) {
          menuElement.setMenuAtivo(opcaoVertical.id);
        }

        if (opcaoVertical.submenus) {
          opcaoVertical.submenus.forEach(submenu => {
            if (rota.includes(submenu.rota)) {
              menuElement.setMenuAtivo(submenu.id);
            }
          });
        }
      });
    },
    configurarMarcaProduto() {
      const marcaProdutoElement: HTMLBthMarcaProdutoElement = document.querySelector('bth-marca-produto');

      marcaProdutoElement.authorization = {
        getAuthorization: this.getAuthorization,
        handleUnauthorizedAccess: this.handleUnauthorizedAccess,
      };
    },
    configurarContaUsuario() {
      const contaUsuarioElement: HTMLBthContaUsuarioElement = document.querySelector('bth-conta-usuario');

      contaUsuarioElement.addEventListener('logout', function logout() {
        // eslint-disable-next-line no-console
        console.debug('O usuário realizou a ação de logout no componente de conta do usuário');
      });
    },
    configurarUtilitarios() {
      const utilitariosElement: HTMLBthUtilitariosElement = document.querySelector('bth-utilitarios');

      utilitariosElement.utilitarios = opcoesUtilitarios;

      // TODO: Entender pq o Vue não consegue importar a interface do CustomEvent<OpcaoUtilitarioSelecionadaEvent>
      // eslint-disable-next-line
      utilitariosElement.addEventListener('opcaoUtilitarioSelecionada', (event: any) => {
        const detail: OpcaoUtilitarioSelecionadaEvent = event.detail;

        if (this.isUrl(detail.rota)) {
          window.open(detail.rota, '_blank')
          return;
        }

        router.push(detail.rota);
      });
    },
    configurarNotificacoes() {
      const notificacoesElement: HTMLBthNotificacoesElement = document.querySelector('bth-notificacoes');

      notificacoesElement.addEventListener('novaNotificacaoComLink', (data) => {
        // eslint-disable-next-line no-console
        console.log('Nova mensagem obtida no componente de notificações', data);
      });

      notificacoesElement.authorization = {
        getAuthorization: this.getAuthorization,
        handleUnauthorizedAccess: this.handleUnauthorizedAccess,
      };
    },
    configurarNovidades() {
      const novidadesElement: HTMLBthNovidadesElement = document.querySelector('bth-novidades');

      novidadesElement.authorization = {
        getAuthorization: this.getAuthorization,
        handleUnauthorizedAccess: this.handleUnauthorizedAccess,
      };
    },
    getAuthorization(): Authorization {
      return {
        accessId: "5e613debe191120137316351",
        accessToken: "fbbbbffd-eeb4-4f7c-b222-8097e55e28fa",
        systemId: 78
      };
    },
    async handleUnauthorizedAccess(): Promise<void> {
      return new Promise(function(resolve) {
        setTimeout(function() {
          resolve();
        }, 3500);
      });
    },
    isUrl(text: string): boolean {
      try {
        new URL(text);
        return true;
      } catch {
        return false;
      }
    },
  }
});
</script>
