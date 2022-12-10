import { createAction, props } from '@ngrx/store';
import { MsalAuthResponse } from '../auth.model';

export const login = createAction('[Auth] login');

export const loginSuccess = createAction(
  '[Auth] loginSuccess',
  props<{ authResponse: MsalAuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] loginFailure',
  props<{ err: Error }>()
);

export const logout = createAction('[Auth] logout');

export const logoutSuccess = createAction('[Auth] logoutSuccess');
