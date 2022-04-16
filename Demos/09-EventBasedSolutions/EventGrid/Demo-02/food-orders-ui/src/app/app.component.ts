import { Component } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-orders-ui';
  events: string[] = [];

  private hubConnection: SignalR.HubConnection;

  constructor() {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.fxEndpoint)
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming events for the specific target
    this.hubConnection.on('newEvent', (event: any) => {
      console.log('received event', event);
      this.events.push(event);
    });
  }
}
