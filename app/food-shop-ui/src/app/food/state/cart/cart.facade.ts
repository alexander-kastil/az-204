import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, startWith, combineLatestWith } from 'rxjs/operators';
import { CartItem } from '../../shop/cart-item.model';
import { Order } from '../../shop/order/order.model';
import { CartActions } from './cart.actions';
import { CartState } from './cart.reducer';
import { getItems, getPersist } from './cart.selector';
import { OrdersService } from '../../shop/order/orders.service';
import { mockOrder } from './mock-data';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  store = inject(Store<CartState>);
  orders = inject(OrdersService);

  clear() {
    this.store.dispatch(CartActions.clear());
    this.store.dispatch(CartActions.clearStorage());
  }

  set(item: CartItem) {
    this.store.dispatch(CartActions.updateCart({ item }));
  }

  togglePersist(persist: boolean) {
    if (!persist) {
      this.store.dispatch(CartActions.clearStorage());
    }
  }

  getPersist() {
    return this.store.select(getPersist);
  }

  getItems() {
    return this.store.select(getItems);
  }

  getItemsCount() {
    return this.store.select(getItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => runningSum + v.quantity, 0)
      ),
      startWith(0)
    );
  }

  getOrder() {
    return this.store.select(getItems).pipe(
      map((items) => {
        let o = Object.assign(new Order(), items);
        return o;
      }))
  };

  getSumTotal() {
    return this.store.select(getItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => {
          return runningSum + v.quantity * v.price;
        }, 0)
      ),
      startWith(0)
    );
  }

  checkout(order: Order) {
    // this.store.dispatch(CartActions.checkout({ item: order }));
    this.orders.checkout(order).subscribe(() => {
      console.log('Order placed successfully');
    });
  }

  saveToStorage(cart: CartItem[]) {
    this.store.dispatch(CartActions.saveToStorage({ cart }));
  }

  loadFromStorage() {
    this.store.dispatch(CartActions.loadFromStorage());
  }
}
