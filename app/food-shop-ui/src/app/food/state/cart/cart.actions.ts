import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { OrderItem } from '../../shop/checkout/order-item.model';
import { CartItem } from '../../shop/cart-item.model';

export const CartActions = createActionGroup({
  source: 'Shopping Cart',
  events: {
    clear: emptyProps(),
    updateCart: props<{ item: CartItem }>(),
    checkout: props<{ item: OrderItem }>(),
    toogglePersist: emptyProps(),
    loadFromStorage: emptyProps(),
    loadFromStorageSuccess: props<{ items: CartItem[] | null }>(),
    clearStorage: emptyProps(),
    saveToStorage: props<{ cart: CartItem[] }>(),
    storageActionSuccess: props<{ status: boolean }>(),
    storageActionFailure: props<{ err: Error }>(),
  },
});
