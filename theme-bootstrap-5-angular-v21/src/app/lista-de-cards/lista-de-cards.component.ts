import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  viewChild,
} from '@angular/core';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
  NgbProgressbarModule,
} from '@ng-bootstrap/ng-bootstrap';

interface ArquivoCard {
  readonly id: number;
  readonly imagemUrl: string;
  readonly titulo: string;
}

@Component({
  selector: 'app-lista-de-cards',
  imports: [NgbDropdownModule, NgbModalModule, NgbProgressbarModule],
  templateUrl: './lista-de-cards.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaDeCardsComponent {
  private readonly modalService = inject(NgbModal);
  private readonly modalTemplate = viewChild.required<TemplateRef<unknown>>('registerModal');

  protected readonly avatares: readonly string[] = [
    'https://picsum.photos/id/220/60',
    'https://picsum.photos/id/221/60',
    'https://picsum.photos/id/222/60',
    'https://picsum.photos/id/223/60',
  ];

  protected readonly arquivos: readonly ArquivoCard[] = [
    { id: 1, imagemUrl: 'https://picsum.photos/id/230/400/320', titulo: 'Este é um arquivo' },
    { id: 2, imagemUrl: 'https://picsum.photos/id/231/400/320', titulo: 'Este é um arquivo' },
    { id: 3, imagemUrl: 'https://picsum.photos/id/232/400/320', titulo: 'Este é um arquivo' },
    { id: 4, imagemUrl: 'https://picsum.photos/id/233/400/320', titulo: 'Este é um arquivo' },
    { id: 5, imagemUrl: 'https://picsum.photos/id/234/400/320', titulo: 'Este é um arquivo' },
    { id: 6, imagemUrl: 'https://picsum.photos/id/235/400/320', titulo: 'Este é um arquivo' },
    { id: 7, imagemUrl: 'https://picsum.photos/id/236/400/320', titulo: 'Este é um arquivo' },
    { id: 8, imagemUrl: 'https://picsum.photos/id/238/400/320', titulo: 'Este é um arquivo' },
  ];

  protected abrirModal(): void {
    this.modalService.open(this.modalTemplate());
  }
}
