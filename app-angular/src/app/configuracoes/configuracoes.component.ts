import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-configuracoes',
  imports: [ReactiveFormsModule, NgbNavModule],
  templateUrl: './configuracoes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguracoesComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly abaAtiva = signal(1);

  protected readonly configuracoes = this.formBuilder.nonNullable.group({
    opcaoAtiva1: true,
    opcaoAtiva2: false,
    tempoInatividade: '10',
    perfil: '1',
  });
}
