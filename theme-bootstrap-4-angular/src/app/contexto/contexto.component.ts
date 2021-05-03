import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contexto',
  templateUrl: './contexto.component.html',
})
export class ContextoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var itens = [
      { id: 1, descricao: 'Extensões', imagemAvatar: 'https://placeimg.com/48/48/tech' },
      { id: 2, descricao: 'Aplicações', icone: 'ship-wheel', complemento: 'Licença bloqueada', iconeStatus: 'lock', iconeStatusTitle: 'Licença bloqueada' },
      { id: 4, descricao: 'Plataforma', icone: 'medal' },
    ]
    
    var selecaoContexto:HTMLBthSelecaoContextoElement = document.querySelector('bth-selecao-contexto[id=selecao-contexto-entidades]');
    
    selecaoContexto.buscar = function buscar() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(itens)
        }, 1500);
      })
    };
    
    selecaoContexto.selecionar = function selecionar(item) {
      console.log('Selecionado entidade', item);
    };
  }

}


