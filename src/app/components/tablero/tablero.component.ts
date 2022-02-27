import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/interfaces/jugador';
import { PartidaService } from 'src/app/services/partida.service';
import { WebsocketService } from 'src/app/services/websocket.service';
interface Data{
  jugador: string;
  posicion:number;
}
@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrls: ['./tablero.component.css']
})
export class TableroComponent implements OnInit {
  posiciones: string[] = [' ',' ',' ',' ',' ',' ',' ',' ',' '];
  turno:boolean=true;
  winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
  get jugadores():Jugador[]{
    return this.partidaService.jugadores;
  }
  constructor(private webSocket:WebsocketService,private partidaService:PartidaService) { }
  get status():boolean{
    return this.webSocket.socketStatus;
  }
  ngOnInit(): void {
   this.webSocket.listen('jugada').subscribe(
      (data) => {
        const {posicion,jugador}=data as Data;
        this.posiciones[posicion] = jugador;
        this.turno = !this.turno;
      })
  }
  cambiar(i:number) {
    if(this.partidaService.created==this.turno){
      const jugador=(this.turno)?'X':'O';
      this.webSocket.emit('jugada',{posicion:i,jugador,sala:this.partidaService.sala});
      this.posiciones[i]=jugador;
      this.turno = !this.turno;
    }
    
  }


  isDisabled(i:number):boolean{ 
    return this.posiciones[i]!=' ';

  }
  checkWin(current:string) :boolean{
    return this.winningCombinations.some(combination => {
        return combination.every(i => this.posiciones[i].includes(current))
    });
  }
}
