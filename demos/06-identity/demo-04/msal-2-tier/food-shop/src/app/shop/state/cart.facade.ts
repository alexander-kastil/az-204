import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, startWith } from 'rxjs/operators';
import { CartItem } from '../cart-item.model';
import { Order } from '../order/order.model';
import { OrdersService } from '../order/orders.service';
import { cartActions } from './cart.actions';
import { CartState, cartState } from './cart.state';

@Injectable({
  providedIn: 'root',
})
export class CartFacade {
  store = inject(Store<CartState>);

  clear() {
    this.store.dispatch(cartActions.clear());
    this.store.dispatch(cartActions.clearStorage());
  }

  set(item: CartItem) {
    this.store.dispatch(cartActions.updateCart({ item }));
  }

  togglePersist(persist: boolean) {
    if (!persist) {
      this.store.dispatch(cartActions.clearStorage());
    }
  }

  getPersist() {
    return this.store.select(cartState.selectPersist);
  }

  getItems() {
    return this.store.select(cartState.selectItems);
  }

  getItemsCount() {
    return this.store.select(cartState.selectItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => runningSum + v.quantity, 0)
      ),
      startWith(0)
    );
  }

  getOrder() {
    return this.store.select(cartState.selectItems).pipe(
      map((items) => {
        let o = Object.assign(new Order(), items);
        return o;
      }))
  };

  getSumTotal() {
    return this.store.select(cartState.selectItems).pipe(
      map((items) =>
        items.reduce((runningSum, v) => {
          return runningSum + v.quantity * v.price;
        }, 0)
      ),
      startWith(0)
    );
  }

  saveToStorage(cart: CartItem[]) {
    this.store.dispatch(cartActions.saveToStorage({ cart }));
  }

  loadFromStorage() {
    this.store.dispatch(cartActions.loadFromStorage());
  }
}
