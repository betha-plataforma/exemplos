import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  NgbDropdownModule,
  NgbModal,
  NgbModalModule,
  NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';

interface Registro {
  readonly id: number;
  readonly nome: string;
  readonly complemento: string;
  readonly coluna2: string;
  readonly coluna3Principal: string;
  readonly coluna3Complemento: string;
  readonly status: string;
  readonly badgeClass: string;
  readonly avatarUrl: string;
}

type FiltroListagem = 'Todos' | 'Pago' | 'Atrasado' | 'Em aberto';

@Component({
  selector: 'app-listagem',
  imports: [ReactiveFormsModule, NgbDropdownModule, NgbModalModule, NgbNavModule],
  templateUrl: './listagem.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListagemComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly modalService = inject(NgbModal);

  private readonly modalTemplate = viewChild.required<TemplateRef<unknown>>('registerModal');

  protected readonly filtroAtivo = signal<FiltroListagem>('Todos');
  protected readonly etapaModalAtiva = signal(1);

  protected readonly formularioRegistro = this.formBuilder.nonNullable.group({
    nome: '',
    cpf: '',
    endereco: '',
  });

  protected readonly filtros: readonly FiltroListagem[] = [
    'Todos',
    'Pago',
    'Atrasado',
    'Em aberto',
  ];

  protected readonly registros: readonly Registro[] = [
    {
      id: 1,
      nome: 'Informação principal',
      complemento: 'Informação complementar',
      coluna2: 'Lorem ipsum',
      coluna3Principal: 'Informação principal',
      coluna3Complemento: 'Informação complementar',
      status: 'Pago',
      badgeClass: 'badge rounded-pill text-bg-success',
      avatarUrl: 'https://picsum.photos/id/237/80',
    },
    {
      id: 2,
      nome: 'Informação principal',
      complemento: 'Informação complementar',
      coluna2: 'Lorem ipsum',
      coluna3Principal: 'Informação principal',
      coluna3Complemento: 'Informação complementar',
      status: 'Atrasado',
      badgeClass: 'badge rounded-pill text-bg-danger',
      avatarUrl: 'https://picsum.photos/id/238/80',
    },
    {
      id: 3,
      nome: 'Informação principal',
      complemento: 'Informação complementar',
      coluna2: 'Lorem ipsum',
      coluna3Principal: 'Informação principal',
      coluna3Complemento: 'Informação complementar',
      status: 'Em aberto',
      badgeClass: 'badge rounded-pill text-bg-warning',
      avatarUrl: 'https://picsum.photos/id/239/80',
    },
  ];

  protected readonly registrosFiltrados = computed(() => {
    const filtro = this.filtroAtivo();

    if (filtro === 'Todos') {
      return this.registros;
    }

    return this.registros.filter((registro) => registro.status === filtro);
  });

  protected abrirModal(): void {
    this.etapaModalAtiva.set(1);
    this.formularioRegistro.reset({
      nome: '',
      cpf: '',
      endereco: '',
    });
    this.modalService.open(this.modalTemplate(), { size: 'lg' });
  }

  protected avancarEtapaModal(): void {
    this.etapaModalAtiva.update((etapa) => Math.min(etapa + 1, 3));
  }
}
