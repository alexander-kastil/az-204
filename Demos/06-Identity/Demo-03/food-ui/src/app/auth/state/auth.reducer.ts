import { MsalAuthResponse } from '../auth.model';
import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logoutSuccess } from './auth.actions';

export const authFeatureKey = 'auth';

export interface MsalAuthState {
  authResponse: MsalAuthResponse | null;
}

const initialState: MsalAuthState = {
  authResponse: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => ({
    ...state,
    authResponse: action.authResponse,
  })),
  on(logoutSuccess, (state, action) => ({
    ...state,
    authResponse: null,
  }))
);
