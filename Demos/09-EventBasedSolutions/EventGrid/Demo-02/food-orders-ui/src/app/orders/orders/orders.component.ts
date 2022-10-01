import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CloudEvent } from '@azure/eventgrid';
import * as SignalR from '@microsoft/signalr';
import { tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { FoodOrder, orderstatus } from '../order.model';
import { OrdersStore } from '../orders.store';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatToolbarModule, MatButtonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersStore],
})
export class OrdersComponent {
  orderevents = this.store.orders$.pipe(
    tap((events) => localStorage.setItem('orders', JSON.stringify(events)))
  );

  private hubConnection: SignalR.HubConnection | null = null;

  constructor(private store: OrdersStore) {
    this.store.init();
    this.initSignalR();
  }

  initSignalR() {
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

  changeStatus(item: CloudEvent<FoodOrder>, status: orderstatus) {
    if (item.data) {
      item.data.status = status;
      this.store.updateOrder(item);
    }
  }

  resetOrders() {}
}
