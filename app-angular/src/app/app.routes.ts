import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'visao-geral',
  },
  {
    path: 'visao-geral',
    loadComponent: () =>
      import('./visao-geral/visao-geral.component').then((m) => m.VisaoGeralComponent),
  },
  {
    path: 'timeline',
    loadComponent: () => import('./timeline/timeline.component').then((m) => m.TimelineComponent),
  },
  {
    path: 'formulario',
    loadComponent: () =>
      import('./formulario/formulario.component').then((m) => m.FormularioComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'listagem',
    loadComponent: () => import('./listagem/listagem.component').then((m) => m.ListagemComponent),
  },
  {
    path: 'sem-registros',
    loadComponent: () =>
      import('./sem-registros/sem-registros.component').then((m) => m.SemRegistrosComponent),
  },
  {
    path: 'configuracoes',
    loadComponent: () =>
      import('./configuracoes/configuracoes.component').then((m) => m.ConfiguracoesComponent),
  },
  {
    path: 'lista-de-cards',
    loadComponent: () =>
      import('./lista-de-cards/lista-de-cards.component').then((m) => m.ListaDeCardsComponent),
  },
  {
    path: 'wizard',
    loadComponent: () => import('./wizard/wizard.component').then((m) => m.WizardComponent),
  },
  {
    path: 'contexto',
    loadComponent: () =>
      import('./selecao-contexto/selecao-contexto.component').then(
        (m) => m.SelecaoContextoComponent,
      ),
  },
  {
    path: 'menu0',
    pathMatch: 'full',
    redirectTo: 'visao-geral',
  },
  {
    path: 'menu1',
    pathMatch: 'full',
    redirectTo: 'timeline',
  },
  {
    path: 'menu2',
    pathMatch: 'full',
    redirectTo: 'formulario',
  },
  {
    path: 'menu3',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'menu4',
    pathMatch: 'full',
    redirectTo: 'listagem',
  },
  {
    path: 'menu5',
    pathMatch: 'full',
    redirectTo: 'sem-registros',
  },
  {
    path: 'menu6',
    pathMatch: 'full',
    redirectTo: 'configuracoes',
  },
  {
    path: 'menu7',
    pathMatch: 'full',
    redirectTo: 'lista-de-cards',
  },
  {
    path: 'menu8',
    pathMatch: 'full',
    redirectTo: 'wizard',
  },
  {
    path: '**',
    redirectTo: 'visao-geral',
  },
];
