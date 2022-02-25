import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresarFormComponent } from './components/ingresar-form/ingresar-form.component';
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';
import { TableroComponent } from './components/tablero/tablero.component';

const routes: Routes = [
 
  {
    path:'',
    component:IngresarFormComponent
  },{
    path:'sala',
    component:SalaEsperaComponent

  
  },{
    path:'ingresar/:sala',
    component:IngresarFormComponent
  },{
    path:'partida/:sala',
    component:TableroComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
