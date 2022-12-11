import { Params } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  component: string;
}

export const getRouterState =
  createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export const getRouterInfo = createSelector(
  getRouterState,
  (state) => state.state
);
