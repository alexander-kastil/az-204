import { Component } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import * as SignalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { FoodOrder } from './orders/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'food-orders-ui';
  events: CloudEvent<FoodOrder>[] = [];

  private hubConnection: SignalR.HubConnection;

  constructor() {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.funcEP)
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming events for the specific target
    this.hubConnection.on('foodapp.order', (event: string) => {
      let evt = JSON.parse(event) as CloudEvent<FoodOrder>;
      console.log('received event', evt);
      this.events = [...this.events, evt];
    });
  }
}
