import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Indicador {
  readonly titulo: string;
  readonly valor: string;
  readonly textoClass: string;
  readonly iconeClass?: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  protected readonly cardsResumo: readonly Indicador[] = [
    { titulo: 'Lorem Ipsum', valor: '10.000,00', textoClass: 'h3' },
    { titulo: 'Lorem Ipsum', valor: '10.000,00', textoClass: 'h3 text-success' },
    { titulo: 'Lorem Ipsum', valor: '10.000,00', textoClass: 'h3 text-warning' },
    { titulo: 'Lorem Ipsum', valor: '-10.000,00', textoClass: 'h3 text-danger' },
  ];

  protected readonly cardsIconeLateral: readonly Indicador[] = [
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-muted m-0 mdi mdi-chart-bar me-3',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-success m-0 mdi mdi-arrow-up me-3',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-warning m-0 mdi mdi-alert-outline me-3',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '-10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-danger m-0 mdi mdi-arrow-down me-3',
    },
  ];

  protected readonly cardsIconeTopo: readonly Indicador[] = [
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-muted mdi mdi-chart-bar',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-success mdi mdi-arrow-up',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-warning mdi mdi-alert-outline',
    },
    {
      titulo: 'Lorem Ipsum',
      valor: '-10.000,00',
      textoClass: 'h3',
      iconeClass: 'h2 text-danger mdi mdi-arrow-down',
    },
  ];
}
