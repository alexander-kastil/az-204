import { Injectable } from '@angular/core';
import { CloudEvent } from '@azure/eventgrid';
import { ComponentStore } from '@ngrx/component-store';
import { map } from 'rxjs/operators';
import { FoodOrder } from './order.model';

export interface OrdersState {
  orders: CloudEvent<FoodOrder>[];
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

  addOrder(order: CloudEvent<FoodOrder>) {
    this.setState((state) => ({
      ...state,
      orders: [...state.orders, order],
    }));
  }

  updateOrder(order: CloudEvent<FoodOrder>) {
    this.setState((state) => ({
      ...state,
      orders: state.orders.map((o) => (o.id === order.id ? order : o)),
    }));
  }

  loadOrdersFromStorage = this.effect((trigger$) => {
    return trigger$.pipe(
      map(() => {
        const orders = localStorage.getItem('orders');
        if (orders) {
          this.setState((state) => ({
            ...state,
            orders: JSON.parse(orders),
          }));
        }
      })
    );
  });
}
