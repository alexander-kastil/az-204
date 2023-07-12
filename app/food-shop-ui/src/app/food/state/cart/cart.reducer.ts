import { createReducer, on } from '@ngrx/store';
import { CartItem } from '../../shop/cart-item.model';
import { CartActions } from './cart.actions';

export const cartFeatureKey = 'cart';

export interface CartState {
  items: CartItem[];
  persist: boolean;
}

const initialState: CartState = {
  items: [],
  persist: true,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.toogglePersist, (state) => ({
    ...state,
    persist: !state.persist,
  })),
  on(CartActions.clear, (state) => ({
    ...state,
    items: [],
  })),
  on(CartActions.loadFromStorageSuccess, (state, action) => ({
    ...state,
    items: action.items || [],
  })),
  on(CartActions.updateCart, (state, action) => {
    let cart: CartItem[] = updateCart(state.items, action.item);
    return { ...state, items: [...cart] };
  })
);

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
