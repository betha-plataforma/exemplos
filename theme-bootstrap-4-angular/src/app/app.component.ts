import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router"

import { Authorization, AuthorizationConfig, OpcaoMenu, Utilitario, OpcaoMenuSelecionadaEvent, OpcaoUtilitarioSelecionadaEvent } from '@betha-plataforma/estrutura-componentes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @ViewChild('app', { static: true }) appElement: ElementRef<HTMLBthAppElement>;
  @ViewChild('marcaProduto', { static: true }) marcaProdutoElement: ElementRef<HTMLBthMarcaProdutoElement>;
  @ViewChild('contaUsuario', { static: true }) contaUsuarioElement: ElementRef<HTMLBthContaUsuarioElement>;
  @ViewChild('utilitarios', { static: true }) utilitariosElement: ElementRef<HTMLBthUtilitariosElement>;
  @ViewChild('notificacoes', { static: true }) notificacoesElement: ElementRef<HTMLBthNotificacoesElement>;
  @ViewChild('novidades', { static: true }) novidadesElement: ElementRef<HTMLBthNovidadesElement>;

  private opcoesMenu: Array<OpcaoMenu> = [
    { id: 'listagem', descricao: 'Listagem', icone: 'view-list', rota: '/', possuiPermissao: true },
    {
      id: '', descricao: 'Menu 2', icone: 'cog', possuiPermissao: true,
      submenus: [
        { id: 'menu2', descricao: 'Submenu 1', rota: '/menu2', possuiPermissao: true },
        { id: 'menu3', descricao: 'Submenu 2', rota: '/menu3', possuiPermissao: true },
      ]
    },
  ];

  private opcoesUtilitarios: Array<Utilitario> = [
    { nome: 'Gerenciador de Acessos', rota: '/menu3', icone: 'key-variant', possuiPermissao: true, },
    { nome: 'Link externo', rota: 'https://aws.amazon.com/pt/console/', icone: 'amazon', possuiPermissao: true },
    { nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit', rota: '/', icone: 'merge', possuiPermissao: true, },
  ]

  private authorization: AuthorizationConfig = {
    getAuthorization: this.getAuthorization,
    handleUnauthorizedAccess: this.handleUnauthorizedAccess,
  }

  constructor(public ngZone: NgZone, public router: Router) { }

  ngOnInit() {
    this.configurarApp();
    this.configurarMarcaProduto();
    this.configurarContaUsuario();
    this.configurarUtilitarios();
    this.configurarNotificacoes();
    this.configurarNovidades();
  }

  private getAuthorization(): Authorization {
    return {
      accessId: '5e613debe191120137316351',
      accessToken: 'fbbbbffd-eeb4-4f7c-b222-8097e55e28fa',
      systemId: 78
    };
  }

  async handleUnauthorizedAccess(): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve();
      }, 3500);
    });
  }

  isUrl(text) {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  private configurarApp() {
    this.appElement.nativeElement.opcoes = this.opcoesMenu;

    this.appElement.nativeElement.addEventListener('opcaoMenuSelecionada', (event: CustomEvent<OpcaoMenuSelecionadaEvent>) => {
      this.ngZone.run(() => {
        this.router.navigate([event.detail.rota]);
      });
    });

    this.setMenuAtivoPorRota(this.router.url);

    this.router.events.subscribe(routeEvent => {
      if (routeEvent instanceof NavigationEnd) {
        const route: NavigationEnd = routeEvent;
        this.setMenuAtivoPorRota(route.url);
      }
    });
  }

  private setMenuAtivoPorRota(rota: string) {
    this.opcoesMenu.forEach(opcaoMenu => {
      if (opcaoMenu.rota === rota) {
        this.appElement.nativeElement.setMenuAtivo(opcaoMenu.id);
      }

      if (opcaoMenu.submenus) {
        opcaoMenu.submenus.forEach(submenu => {
          if (rota.includes(submenu.rota)) {
            this.appElement.nativeElement.setMenuAtivo(submenu.id);
          }
        });
      }
    })
  }

  private configurarMarcaProduto() {
    this.marcaProdutoElement.nativeElement.authorization = this.authorization;
  }

  private configurarContaUsuario() {
    this.contaUsuarioElement.nativeElement.addEventListener('logout', function logout() {
      console.debug('O usuário realizou a ação de logout no componente de conta do usuário');
    });
  }

  private configurarUtilitarios() {
    this.utilitariosElement.nativeElement.utilitarios = this.opcoesUtilitarios;

    this.utilitariosElement.nativeElement.addEventListener('opcaoUtilitarioSelecionada', (event: CustomEvent<OpcaoUtilitarioSelecionadaEvent>) => {
      this.ngZone.run(() => {
        if (this.isUrl(event.detail.rota)) {
          window.open(event.detail.rota, '_blank')
          return;
        }

        this.router.navigate([event.detail.rota]);
      });
    });
  }

  private configurarNotificacoes() {
    this.notificacoesElement.nativeElement.addEventListener('novaNotificacaoComLink', (data: CustomEvent) => {
      console.log('Nova mensagem obtida no componente de notificações', data.detail);
    });

    this.notificacoesElement.nativeElement.authorization = this.authorization;
  }

  private configurarNovidades() {
    this.novidadesElement.nativeElement.authorization = this.authorization;
  }

}
