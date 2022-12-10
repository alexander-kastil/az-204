import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, MsalAuthState } from './auth.reducer';

export const getAuthState =
  createFeatureSelector<MsalAuthState>(authFeatureKey);

export const isAuthenticated = createSelector(
  getAuthState,
  (state) => state.authResponse != null
);

export const getUser = createSelector(
  getAuthState,
  (state) => state.authResponse?.account.username
);

export const getToken = createSelector(
  getAuthState,
  (state) => state.authResponse?.accessToken
);
