import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Order } from '../../shop/order/order.model';
import { CartItem } from '../../shop/cart-item.model';

export const cartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    clear: emptyProps(),
    updateCart: props<{ item: CartItem }>(),
    checkout: props<{ item: Order }>(),
    togglePersist: emptyProps(),
    loadFromStorage: emptyProps(),
    loadFromStorageSuccess: props<{ items: CartItem[] | null }>(),
    clearStorage: emptyProps(),
    saveToStorage: props<{ cart: CartItem[] }>(),
    storageActionSuccess: props<{ status: boolean }>(),
    storageActionFailure: props<{ err: Error }>(),
  },
});
