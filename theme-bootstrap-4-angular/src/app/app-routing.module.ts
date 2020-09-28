import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Menu3Component } from './menu3/menu3.component';
import { Menu2Component } from './menu2/menu2.component';
import { ListagemComponent } from './listagem/listagem.component';

const routes: Routes = [
  { path: '', component: ListagemComponent },
  { path: 'menu2', component: Menu2Component },
  { path: 'menu3', component: Menu3Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
