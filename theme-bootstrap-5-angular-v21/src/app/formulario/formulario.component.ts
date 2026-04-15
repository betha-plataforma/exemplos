import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgbAlertModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-formulario',
  imports: [ReactiveFormsModule, RouterLink, NgbAlertModule, NgbNavModule],
  templateUrl: './formulario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormularioComponent {
  private readonly formBuilder = inject(FormBuilder);

  protected readonly abaAtiva = signal(1);

  protected readonly formulario = this.formBuilder.nonNullable.group({
    nome: '',
    pas: '',
    pad: '',
    cpf: '',
    endereco: '',
    valor: '',
    tamanho: '',
    opcao1: false,
    opcao2: false,
    opcao3: false,
    escolha: '1',
    descricao: '',
    receberAtualizacoes: true,
  });
}
