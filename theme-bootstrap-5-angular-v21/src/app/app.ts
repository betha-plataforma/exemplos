import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  ElementRef,
  inject,
  NgZone,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

import {
  Authorization,
  AuthorizationConfig,
  OpcaoMenu,
  OpcaoMenuSelecionadaEvent,
  OpcaoUtilitarioSelecionadaEvent,
  Utilitario,
} from '@betha-plataforma/estrutura-componentes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly ngZone = inject(NgZone);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  private readonly appElement = viewChild.required<ElementRef<HTMLBthAppElement>>('app');
  private readonly marcaProdutoElement = viewChild.required<ElementRef<HTMLBthMarcaProdutoElement>>('marcaProduto');
  private readonly contaUsuarioElement = viewChild.required<ElementRef<HTMLBthContaUsuarioElement>>('contaUsuario');
  private readonly utilitariosElement = viewChild.required<ElementRef<HTMLBthUtilitariosElement>>('utilitarios');
  private readonly notificacoesElement = viewChild.required<ElementRef<HTMLBthNotificacoesElement>>('notificacoes');
  private readonly novidadesElement = viewChild.required<ElementRef<HTMLBthNovidadesElement>>('novidades');

  private readonly opcoesMenu: OpcaoMenu[] = [
    {
      id: 'visao-geral',
      descricao: 'Visão geral',
      icone: 'home',
      rota: '/visao-geral',
      possuiPermissao: true,
    },
    {
      id: 'secoes',
      descricao: 'Seções',
      icone: 'book-open-page-variant',
      possuiPermissao: true,
      submenus: [
        { id: 'dashboard', descricao: 'Dashboard', rota: '/dashboard', possuiPermissao: true },
        { id: 'listagem', descricao: 'Listagem', rota: '/listagem', possuiPermissao: true },
        {
          id: 'lista-de-cards',
          descricao: 'Lista de cards',
          rota: '/lista-de-cards',
          possuiPermissao: true,
        },
        { id: 'timeline', descricao: 'Timeline', rota: '/timeline', possuiPermissao: true },
        { id: 'formulario', descricao: 'Formulário', rota: '/formulario', possuiPermissao: true },
        {
          id: 'sem-registros',
          descricao: 'Sem registros',
          rota: '/sem-registros',
          possuiPermissao: true,
        },
        {
          id: 'configuracoes',
          descricao: 'Configurações',
          rota: '/configuracoes',
          possuiPermissao: true,
        },
        { id: 'wizard', descricao: 'Wizard', rota: '/wizard', possuiPermissao: true },
      ],
    },
  ];

  private readonly menuRouteAliases: Readonly<Record<string, readonly string[]>> = {
    'visao-geral': ['/', '/visao-geral'],
    dashboard: ['/dashboard'],
    listagem: ['/listagem'],
    'lista-de-cards': ['/lista-de-cards'],
    timeline: ['/timeline'],
    formulario: ['/formulario'],
    'sem-registros': ['/sem-registros'],
    configuracoes: ['/configuracoes'],
    wizard: ['/wizard'],
  };

  private readonly opcoesUtilitarios: Utilitario[] = [
    {
      nome: 'Gerenciador de Acessos',
      rota: '/dashboard',
      icone: 'key-variant',
      possuiPermissao: true,
    },
    {
      nome: 'Link externo',
      rota: 'https://aws.amazon.com/pt/console/',
      icone: 'amazon',
      possuiPermissao: true,
    },
    {
      nome: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit',
      rota: '/',
      icone: 'merge',
      possuiPermissao: true,
    },
  ];

  private readonly authorization: AuthorizationConfig = {
    getAuthorization: () => this.getAuthorization(),
    handleUnauthorizedAccess: () => this.handleUnauthorizedAccess(),
  };

  constructor() {
    afterNextRender(() => {
      this.configurarApp();
      this.configurarMarcaProduto();
      this.configurarContaUsuario();
      this.configurarUtilitarios();
      this.configurarNotificacoes();
      this.configurarNovidades();
    });
  }

  private getAuthorization(): Authorization {
    return {
      accessId: '5e613debe191120137316351',
      accessToken: 'fbbbbffd-eeb4-4f7c-b222-8097e55e28fa',
      systemId: 78,
    };
  }

  private async handleUnauthorizedAccess(): Promise<void> {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 3500);
    });
  }

  private isUrl(text: string): boolean {
    try {
      new URL(text);
      return true;
    } catch {
      return false;
    }
  }

  private configurarApp(): void {
    const app = this.appElement().nativeElement;
    app.opcoes = this.opcoesMenu;

    this.addCustomEventListener<OpcaoMenuSelecionadaEvent>(
      app,
      'opcaoMenuSelecionada',
      (event) => {
        this.ngZone.run(() => {
          const rota = String(event.detail.rota);
          void this.router.navigateByUrl(rota);
        });
      },
    );

    this.setMenuAtivoPorRota(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((route) => {
        const url = route.urlAfterRedirects || route.url;
        app.opcoes = url === '/contexto' ? [] : this.opcoesMenu;
        this.setMenuAtivoPorRota(url);
      });
  }

  private setMenuAtivoPorRota(rota: string): void {
    const app = this.appElement().nativeElement;

    for (const [menuId, aliases] of Object.entries(this.menuRouteAliases)) {
      for (const alias of aliases) {
        if (this.matchesRoute(rota, alias)) {
          if (typeof app.setMenuAtivo === 'function') {
            app.setMenuAtivo(menuId);
          }
          return;
        }
      }
    }
  }

  private matchesRoute(currentRoute: string, menuRoute: string): boolean {
    if (menuRoute === '/') {
      return currentRoute === '/';
    }

    return currentRoute === menuRoute || currentRoute.startsWith(`${menuRoute}/`);
  }

  private configurarMarcaProduto(): void {
    this.marcaProdutoElement().nativeElement.authorization = this.authorization;
  }

  private configurarContaUsuario(): void {
    const contaUsuario = this.contaUsuarioElement().nativeElement;
    const logoutListener = () => {
      console.debug('O usuário realizou a ação de logout no componente de conta do usuário');
    };

    contaUsuario.addEventListener('logout', logoutListener);
    this.destroyRef.onDestroy(() => {
      contaUsuario.removeEventListener('logout', logoutListener);
    });
  }

  private configurarUtilitarios(): void {
    const utilitarios = this.utilitariosElement().nativeElement;
    utilitarios.utilitarios = this.opcoesUtilitarios;

    this.addCustomEventListener<OpcaoUtilitarioSelecionadaEvent>(
      utilitarios,
      'opcaoUtilitarioSelecionada',
      (event) => {
        this.ngZone.run(() => {
          const rota = String(event.detail.rota);

          if (this.isUrl(rota)) {
            window.open(rota, '_blank', 'noopener,noreferrer');
            return;
          }

          void this.router.navigateByUrl(rota);
        });
      },
    );
  }

  private configurarNotificacoes(): void {
    const notificacoes = this.notificacoesElement().nativeElement;

    this.addCustomEventListener<unknown>(notificacoes, 'novaNotificacaoComLink', (event) => {
      console.log('Nova mensagem obtida no componente de notificações', event.detail);
    });

    notificacoes.authorization = this.authorization;
  }

  private configurarNovidades(): void {
    this.novidadesElement().nativeElement.authorization = this.authorization;
  }

  private addCustomEventListener<T>(
    element: EventTarget,
    eventName: string,
    handler: (event: CustomEvent<T>) => void,
  ): void {
    const listener: EventListener = (event) => {
      handler(event as CustomEvent<T>);
    };

    element.addEventListener(eventName, listener);
    this.destroyRef.onDestroy(() => {
      element.removeEventListener(eventName, listener);
    });
  }
}
