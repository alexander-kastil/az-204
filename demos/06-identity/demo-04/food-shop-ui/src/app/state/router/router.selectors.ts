import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterReducerState, getRouterSelectors } from '@ngrx/router-store';
import { RouterStateUrl } from './router.reducer';

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export const getRouterInfo = createSelector(
  getRouterState,
  (state) => state.state
);

export const getComponent = createSelector(
  getRouterState,
  (state) => state.state.component
);

const {
  selectQueryParams, // select the current route query params
  selectRouteParams, // select the current route params
  selectRouteData, // select the current route data
  selectUrl, // select the current url
} = getSelectors(getRouterState);
