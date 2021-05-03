import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Menu0Component } from './menu0/menu0.component';
import { Menu1Component } from './menu1/menu1.component';
import { Menu2Component } from './menu2/menu2.component';
import { Menu3Component } from './menu3/menu3.component';
import { Menu4Component } from './menu4/menu4.component';
import { Menu5Component } from './menu5/menu5.component';
import { Menu6Component } from './menu6/menu6.component';
import { Menu7Component } from './menu7/menu7.component';
import { Menu8Component } from './menu8/menu8.component';
import { ContextoComponent } from './contexto/contexto.component';


@NgModule({
  declarations: [AppComponent, Menu1Component, Menu2Component, Menu3Component, Menu4Component, Menu5Component, Menu6Component, Menu7Component, Menu8Component, Menu0Component, ContextoComponent,],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
