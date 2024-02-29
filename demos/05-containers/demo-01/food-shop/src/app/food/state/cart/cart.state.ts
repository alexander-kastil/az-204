import { createFeature, createReducer, on } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { cartActions } from './cart.actions';

export interface CartState {
  items: CartItem[];
  persist: boolean;
}

const initialState: CartState = {
  items: [],
  persist: true,
};

export const cartFeature = createFeature({
  name: 'cart',
  reducer: createReducer(
    initialState,
    on(cartActions.togglePersist, (state) => ({
      ...state,
      persist: !state.persist,
    })),
    on(cartActions.clear, (state) => ({
      ...state,
      items: [],
    })),
    on(cartActions.loadFromStorageSuccess, (state, action) => ({
      ...state,
      items: action.items || [],
    })),
    on(cartActions.updateCart, (state, action) => {
      let cart: CartItem[] = updateCart(state.items, action.item);
      return { ...state, items: [...cart] };
    })
  ),
});

function updateCart(state: CartItem[], item: CartItem): CartItem[] {
  let cart: CartItem[] = [...state];
  if (cart.length == 0) {
    cart.push(item);
  } else {
    let idx = cart.findIndex((i) => i.id == item.id);
    if (idx > -1) {
      if (item.quantity == 0) {
        cart = cart.filter((i) => i.id != item.id);
      } else {
        cart[idx] = { ...item };
      }
    } else {
      cart.push(item);
    }
  }
  return cart;
}
