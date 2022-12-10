import { createReducer, on } from '@ngrx/store';
import { MsalAuthResponse } from '../auth.model';
import { loginSuccess, logoutSuccess } from './auth.actions';
import { environment } from '../../../environments/environment';

export const authFeatureKey = 'auth';

export interface MsalAuthState {
  authResponse: MsalAuthResponse | null;
  authenticated: boolean;
}

const initialState: MsalAuthState = {
  authResponse: null,
  authenticated: !environment.authEnabled,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    authResponse: action.authResponse,
    authenticated: true,
  })),
  on(logoutSuccess, (state, action) => ({
    ...state,
    authResponse: null,
    authenticated: false,
  }))
);
