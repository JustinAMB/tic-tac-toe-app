import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableroComponent } from './components/tablero/tablero.component';

@NgModule({
  declarations: [
    AppComponent,
    TableroComponent
  ],
  imports: [
    BrowserModule,
    SocketIoModule.forRoot( environment.socketConfig ),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
