import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureKey } from "../reducers/auth.reducer";
import { environment } from "../../../../environments/environment";

export const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const getUser = createSelector(
  getAuthState,
  (state: AuthState) => state.user
);

export const getToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token
);

export const getLoggedIn = createSelector(
  getAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const displayAuth = createSelector(getAuthState, (state: AuthState) =>
  environment.authEnabled ? !state.isLoggedIn : false
);

export const hasToken = createSelector(
  getAuthState,
  (state: AuthState) => state.token != ""
);
