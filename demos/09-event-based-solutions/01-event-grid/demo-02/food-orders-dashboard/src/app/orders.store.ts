import { Injectable } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';
import { Order } from './order.model';

export interface OrdersState {
  orders: CloudEvent<Order>[];
}

export const initialState: OrdersState = {
  orders: [],
};

@Injectable()
export class OrdersStore extends ComponentStore<OrdersState> {
  orders$ = this.select((state) => state.orders);

  constructor() {
    super(initialState);
  }

  init() {
    this.loadOrdersFromStorage();
  }

  resetOrders() {
    this.setState(initialState);
  }

  addOrder(order: CloudEvent<Order>) {
    console.log('New order event', order)
    this.setState((state) => ({
      ...state,
      orders: [...state.orders, order],
    }));
  }

  updateOrder(order: CloudEvent<Order>) {
    this.setState((state) => ({
      ...state,
      orders: state.orders.map((o) => o.id == order.id ? order : o),
    }));

    if ((order.data?.status == 'ready_for_delivery', order.data?.status == 'rejected')) {
      console.log('New order event', order);
    }
  }

  loadOrdersFromStorage = this.effect((trigger$) => {
    return trigger$.pipe(
      map(() => {
        let strOrders = localStorage.getItem('orders');
        if (strOrders) {
          const orders = JSON.parse(strOrders);
          this.setState((state) => ({
            ...state,
            orders: [...orders],
          }));
        }
      })
    );
  });
}
