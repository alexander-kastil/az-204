import { createReducer, on } from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { MsalAuthResponse } from '../auth-response.model';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface MsalAuthState {
  authResponse: MsalAuthResponse | null;
  authEnabled: boolean;
}

const initialState: MsalAuthState = {
  authResponse: null,
  authEnabled: environment.authEnabled,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginsuccess, (state, action) => ({
    ...state,
    authResponse: action.authResponse,
    authenticated: true,
  })),
  on(AuthActions.logoutsuccess, (state, action) => ({
    ...state,
    authResponse: null,
    authenticated: false,
  }))
);
