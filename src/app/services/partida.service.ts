import { Injectable } from '@angular/core';
import { Jugador } from '../interfaces/jugador';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {
  sala:string=this.salaLocal();
  jugadores:Jugador[]=[];
  created:boolean=false;
  private _winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
  constructor() { }
  get winningCombinations():number[][]{
    return [...this._winningCombinations];
  }


  salaLocal():string{
    return  localStorage.getItem('sala') || '';
  }
}
