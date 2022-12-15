import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, MsalAuthState } from './auth.reducer';

export const getAuthState =
  createFeatureSelector<MsalAuthState>(authFeatureKey);

export const getAuthEnabled = createSelector(
  getAuthState,
  (state) => state.authEnabled
);

export const getLoggedIn = createSelector(
  getAuthState,
  (state) => state.authResponse !== null
);

export const getUser = createSelector(
  getAuthState,
  (state) => state.authResponse?.account.username
);

export const getToken = createSelector(
  getAuthState,
  (state) => state.authResponse?.accessToken
);
