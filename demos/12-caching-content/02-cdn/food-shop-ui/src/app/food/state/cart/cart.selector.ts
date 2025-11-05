import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState, cartFeatureKey } from './cart.reducer';

export const getCartState = createFeatureSelector<CartState>(cartFeatureKey);

export const getItems = createSelector(
  getCartState,
  (state: CartState) => state.items
);

export const getPersist = createSelector(
  getCartState,
  (state: CartState) => state.persist
);
