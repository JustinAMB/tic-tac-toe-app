import { Component, OnInit } from '@angular/core';
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
  constructor(private webSocket:WebsocketService,private partidaService:PartidaService) { }

  ngOnInit(): void {
  }

  ingresar() {
    const sala = uuidv4();
    const data={
      sala,
      nombre:this.name
    }
    this.partidaService.sala=sala;
    this.webSocket.emit('iniciarPartida',data); //emitir evento al servidor



  }

}
