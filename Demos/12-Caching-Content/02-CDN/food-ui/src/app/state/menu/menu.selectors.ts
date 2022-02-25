import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MenuState } from './menu.reducer';

export const getMenuState = createFeatureSelector<MenuState>('menu');

export const getSideNavVisible = createSelector(
  getMenuState,
  (state: MenuState) => state.sideNavVisible
);

export const getSideNavEnabled = createSelector(
  getMenuState,
  (state: MenuState) => state.sideNavEnabled
);

export const getSideNavPosition = createSelector(
  getMenuState,
  (state: MenuState) => state.sideNavPosition
);
