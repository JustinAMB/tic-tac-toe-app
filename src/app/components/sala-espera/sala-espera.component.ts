import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from 'src/app/interfaces/jugador';
import { PartidaService } from 'src/app/services/partida.service';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {

  constructor(private partidaService:PartidaService,private webSocket:WebsocketService,private router:Router) { }
get sala():string{
  const url=window.location.origin;
  return `${url}/ingresar/${this.partidaService.sala}`;
}
  ngOnInit(): void {
   
    this.webSocket.listen('iniciarPartida').subscribe (data=>{
      const jugadores:Jugador[]=data as Jugador[];
      if(jugadores.length>1){
        this.partidaService.jugadores=jugadores;
        this.router.navigate(['partida',this.sala]);
      }
    })
  }

}
