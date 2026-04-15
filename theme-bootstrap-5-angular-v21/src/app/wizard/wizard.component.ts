import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-wizard',
  imports: [ReactiveFormsModule, NgbNavModule],
  templateUrl: './wizard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WizardComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly etapaAtiva = signal(1);
  protected readonly primeiraEtapa = computed(() => this.etapaAtiva() === 1);
  protected readonly ultimaEtapaDisponivel = computed(() => this.etapaAtiva() === 3);

  protected readonly formulario = this.formBuilder.nonNullable.group({
    nome: '',
    pas: '',
    pad: '',
    cpf: '',
    endereco: '',
  });

  protected avancar(): void {
    this.etapaAtiva.update((etapa) => Math.min(etapa + 1, 3));
  }

  protected voltar(): void {
    this.etapaAtiva.update((etapa) => Math.max(etapa - 1, 1));
  }
}
