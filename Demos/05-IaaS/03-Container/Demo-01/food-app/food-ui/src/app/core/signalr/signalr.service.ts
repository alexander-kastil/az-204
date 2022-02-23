import { Injectable } from '@angular/core';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SignalrService {
  private hubConnection: SignalR.HubConnection;

  constructor() {
    // Create connection
    let signalREP = `https://${environment.azure.signalREndpoint}/api`;
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(signalREP)
      .build();
    this.hubConnection.start();
    this.hubConnection.on('foodEvent', (event: any) => {
      console.log('received foodEvent', event);
    });
  }
}
