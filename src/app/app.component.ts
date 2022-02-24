import { Component } from '@angular/core';
import { WebsocketService } from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gato-app';
  constructor(private webSocket: WebsocketService) { }
  ngOnInit() {
    this.webSocket.listen('jugar').subscribe(
      (data) => {
        console.log(data);
      }
    )
  }
  
}
