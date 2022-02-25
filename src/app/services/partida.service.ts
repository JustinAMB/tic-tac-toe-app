import { Injectable } from '@angular/core';
import { Jugador } from '../interfaces/jugador';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  sala:string=this.salaLocal();
  jugadores:Jugador[]=[];
  constructor() { }



  salaLocal():string{
    return  localStorage.getItem('sala') || '';
  }
}
