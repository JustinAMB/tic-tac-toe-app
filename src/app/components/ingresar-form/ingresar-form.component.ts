import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Jugador } from 'src/app/interfaces/jugador';
import { PartidaService } from 'src/app/services/partida.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-ingresar-form',
  templateUrl: './ingresar-form.component.html',
  styleUrls: ['./ingresar-form.component.css']
})
export class IngresarFormComponent implements OnInit {
  name:string='';
  constructor(private activatedRoute: ActivatedRoute, private webSocket:WebsocketService,private partidaService:PartidaService,private router:Router) { }

  ngOnInit(): void {
    if (!this.router.url.includes('ingresar')) {
      return;
    }
    this.activatedRoute.params.subscribe(params => {
      if (params.sala) {
        this.partidaService.sala = params.sala as string;
      }
    });
  }

  ingresar() {
    if(!this.router.url.includes('ingresar')){
      const sala = uuidv4();
      const data={
        sala,
        nombre:this.name,
        created:true
      }
      this.partidaService.sala=sala;
      this.webSocket.emit('iniciarPartida',data,(data:Jugador[])=>{
        localStorage.setItem('sala',sala);
        this.router.navigate(['/sala']);
      }); //emitir evento al servidor
     
    }else{
      
      const data={
        sala:this.partidaService.sala,
        nombre:this.name,
        created:false
      }
     
      this.webSocket.emit('iniciarPartida',data,(data: Jugador[])=>{
        const jugadores:Jugador[]=data ;
        if(jugadores.length>1){
          this.partidaService.jugadores=jugadores;
          localStorage.setItem('sala',this.partidaService.sala);
          this.router.navigate(['partida',this.partidaService.sala]);}

      }); //emitir evento al servidor
     
    }
   

  }

}
