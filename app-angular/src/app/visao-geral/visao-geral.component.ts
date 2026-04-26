import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Principio {
  readonly iconeClass: string;
  readonly titulo: string;
}

@Component({
  selector: 'app-visao-geral',
  imports: [RouterLink],
  templateUrl: './visao-geral.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisaoGeralComponent {
  protected readonly principios: readonly Principio[] = [
    {
      iconeClass: 'h2 mdi mdi-pinwheel-outline tx__aqua--l10 mt-5',
      titulo: 'Mantenha a interface simples',
    },
    {
      iconeClass: 'h2 mdi mdi-bullseye-arrow tx__purple--l10 mt-5',
      titulo: 'Dê prioridade para o objetivo principal da tela',
    },
    {
      iconeClass: 'h2 mdi mdi-baby-face-outline tx__orange--l10 mt-5',
      titulo: 'Utilize linguagem clara e direta',
    },
    {
      iconeClass: 'h2 mdi mdi-toy-brick-outline tx__yellow--l10 mt-5',
      titulo: 'Mantenha o padrão entre as telas',
    },
    {
      iconeClass: 'h2 mdi mdi-alert-outline tx__red--l10 mt-5',
      titulo: 'Alerte o usuário sobre ações críticas',
    },
    {
      iconeClass: 'h2 mdi mdi-check-all tx__green--l10 mt-5',
      titulo: 'Informe o resultado das ações',
    },
  ];
}
