import { Component } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import * as SignalR from '@microsoft/signalr';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FoodOrder } from '../order.model';
import { OrdersStore } from '../orders.store';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersStore],
})
export class OrdersComponent {
  orderevents = this.store.orders$.pipe(
    tap((events) => localStorage.setItem('orders', JSON.stringify(events)))
  );
  private hubConnection: SignalR.HubConnection;

  constructor(private store: OrdersStore) {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.funcEP)
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming events for the specific target
    this.hubConnection.on('foodapp.order', (event: string) => {
      let evt = JSON.parse(event) as CloudEvent<FoodOrder>;
      this.store.addOrder(evt);
    });
  }

  changeStatus(status: CloudEvent<FoodOrder>) {
    this.store.updateOrder(status);
  }
}
