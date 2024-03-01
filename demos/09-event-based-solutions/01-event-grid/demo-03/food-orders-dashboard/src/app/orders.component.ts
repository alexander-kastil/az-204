import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CloudEvent } from '@azure/eventgrid';
import * as SignalR from '@microsoft/signalr';
import { tap } from 'rxjs';
import { combineLatestWith, map, startWith } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FoodOrder, orderstatus } from './order.model';
import { OrdersStore } from './orders.store';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersStore],
})
export class OrdersComponent {
  private store = inject(OrdersStore);
  private hubConnection: SignalR.HubConnection | null = null;

  showAll = new FormControl(false);

  view = this.store.orders$.pipe(
    tap((orders) => localStorage.setItem('orders', JSON.stringify(orders))),
    combineLatestWith(this.showAll.valueChanges.pipe(startWith(false))),
    map(([orders, showAll]) =>
      showAll
        ? orders
        : orders.filter(
          (evt) =>
            evt.data?.status == 'incoming' || evt.data?.status == 'preparing'
        )
    )
  );

  constructor() {
    this.store.init();
    this.connectSignalR();
  }

  connectSignalR() {
    // Create connection
    this.hubConnection = new SignalR.HubConnectionBuilder()
      .withUrl(environment.funcWebhookEP)
      .build();

    // Start connection. This will call negotiate endpoint
    this.hubConnection.start();

    // Handle incoming orders for the specific target
    this.hubConnection.on('foodapp.order', (event: string) => {
      let evt = JSON.parse(event) as CloudEvent<FoodOrder>;
      this.store.addOrder(evt);
    });
  }

  changeOrderStatus(item: CloudEvent<FoodOrder>, status: orderstatus) {
    if (item.data) {
      item.data.status = status;
      this.store.updateOrder(item);
    }
  }

  resetOrders() {
    this.store.resetOrders();
  }
}
