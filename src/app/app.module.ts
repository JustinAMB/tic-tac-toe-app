import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { IngresarFormComponent } from './components/ingresar-form/ingresar-form.component';
import { FormsModule } from '@angular/forms';
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent,
    IngresarFormComponent,
    SalaEsperaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocketIoModule.forRoot( environment.socketConfig ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
