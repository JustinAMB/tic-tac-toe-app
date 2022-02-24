import { Component, OnInit } from '@angular/core';
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
  posiciones: string[] = ['','','','','','','','',''];
  turno:boolean=true;
  constructor(private webSocket:WebsocketService) { }
  get status():boolean{
    return this.webSocket.socketStatus;
  }
  ngOnInit(): void {
    this.webSocket.listen('jugar').subscribe(
      (data) => {
        const {posicion,jugador}=data as Data;
        this.posiciones[posicion] = jugador;
        this.turno = !this.turno;
      })
  }
  cambiar(i:number) {
    const jugador=(this.turno)?'X':'O';
    this.webSocket.emit('jugar',{posicion:i,jugador});
    this.posiciones[i]=jugador;
    this.turno = !this.turno;
  }

}
