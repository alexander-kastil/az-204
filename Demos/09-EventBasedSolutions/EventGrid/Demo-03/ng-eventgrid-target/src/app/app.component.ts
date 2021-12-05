import { Component } from '@angular/core';
import * as SignalR from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'viewer-app';
  events: string[] = [];

  private hubConnection: SignalR.HubConnection;

  constructor() {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl('https://foodhub-dev.azurewebsites.net/api')
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming events for the specific target
    this.hubConnection.on('newEvent', (event: any) => {
      this.events.push(event);
    });
  }
}
