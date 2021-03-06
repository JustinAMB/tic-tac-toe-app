import { Component, OnInit } from '@angular/core';
import { Jugador } from 'src/app/interfaces/jugador';
import { PartidaService } from 'src/app/services/partida.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import swal from 'sweetalert2';
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
  ganador:number=-1;
  turno:boolean=true;
  get winningCombinations():number[][]{
    return [...this.partidaService.winningCombinations];
  }
  get jugadores():Jugador[]{
    return this.partidaService.jugadores;
  }
  constructor(private webSocket:WebsocketService,private partidaService:PartidaService) { }
  get status():boolean{
    return this.webSocket.socketStatus;
  }
  ngOnInit(): void {
    this.webSocket.listen('ganador').subscribe(
      (data:any) => {

        this.ganador = data.ganador as number;
        if(this.ganador!==-1){
          this.mostrarGanador();
        }
        
      }) 
   this.webSocket.listen('jugada').subscribe(
      (data) => {
        const {posicion,jugador}=data as Data;
        this.posiciones[posicion] = jugador;
        if(this.ganador===-1){
          this.turno = !this.turno;
        }
        
      });
      this.webSocket.listen('reiniciar').subscribe(
        (data:any) => {
          const reiniciar=data.reiniciar as boolean;
          if(reiniciar===true){
            this.reiniciarTablero();
          }
        }
      );
     
  
  }
  cambiar(i:number) {
    if(this.partidaService.created===this.turno&& this.ganador===-1){
      const jugador=(this.turno)?'X':'O';
      this.webSocket.emit('jugada',{posicion:i,jugador,sala:this.partidaService.sala});
      this.posiciones[i]=jugador;
      this.ganador=this.checkWin(jugador)?Number(this.turno):-1;
      if(this.ganador===-1){
        this.ganador=(this.hayEmpate())?2:-1;
      }
      if(this.ganador===-1){
        this.turno = !this.turno;
      }else{
        const data={
          sala:this.partidaService.sala,
          ganador:this.ganador
        }
        this.webSocket.emit('ganador',data);
        this.mostrarGanador();
      }
    }
  }


  isDisabled(i:number):boolean{ 
    return this.posiciones[i]!=' ' ;

  }

  mostrarGanador(){
    
    if(this.ganador===2){
      swal.fire('Empate','Ninguno ha ganado','warning');
    }
    
          if(this.ganador===Number(this.turno)){
            swal.fire('Victoria','Haz Ganado','success');
          }else{
            swal.fire('Derrota','Haz perdido','error');
            this.turno=!this.turno;
          }
  }
  checkWin(current:string) :boolean{
    return this.winningCombinations.some(combination => {
      return combination.every(i => this.posiciones[i].includes(current))
    });
  }
  reiniciar(){
    this.webSocket.emit('reiniciar',{reiniciar:true,sala:this.partidaService.sala});
    this.reiniciarTablero();
  }

  reiniciarTablero(){
    this.posiciones=[' ',' ',' ',' ',' ',' ',' ',' ',' '];
    this.ganador=-1;
  }
  hayEmpate():boolean{
    return this.posiciones.every(p=>p!=' ');
  }
}
