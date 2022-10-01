import { Component, OnInit } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import { FoodOrder } from '../order.model';
import * as SignalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent {
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

  changeStatus(status: CloudEvent<FoodOrder>) {}
}
