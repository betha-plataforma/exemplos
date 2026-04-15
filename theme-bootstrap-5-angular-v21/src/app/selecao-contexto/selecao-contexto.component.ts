import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  viewChild,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

interface ItemContexto {
  readonly id: number;
  readonly descricao: string;
  readonly imagemAvatar?: string;
  readonly icone?: string;
  readonly complemento?: string;
  readonly iconeStatus?: string;
  readonly iconeStatusTitle?: string;
}

@Component({
  selector: 'app-selecao-contexto',
  imports: [NgOptimizedImage, RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './selecao-contexto.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelecaoContextoComponent {
  private readonly selecaoContextoElement =
    viewChild.required<ElementRef<HTMLBthSelecaoContextoElement>>('selecaoContexto');

  private readonly itens: readonly ItemContexto[] = [
    { id: 1, descricao: 'Extensões', imagemAvatar: 'https://placeimg.com/48/48/tech' },
    {
      id: 2,
      descricao: 'Aplicações',
      icone: 'ship-wheel',
      complemento: 'Licença bloqueada',
      iconeStatus: 'lock',
      iconeStatusTitle: 'Licença bloqueada',
    },
    { id: 4, descricao: 'Plataforma', icone: 'medal' },
  ];

  constructor() {
    afterNextRender(() => {
      this.configurarSelecaoContexto();
    });
  }

  private configurarSelecaoContexto(): void {
    const selecaoContexto = this.selecaoContextoElement().nativeElement;

    selecaoContexto.buscar = async () => {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, 1500);
      });

      return [...this.itens];
    };

    selecaoContexto.selecionar = (item) => {
      console.log('Selecionado entidade', item);
    };
  }
}
