import { props, emptyProps, createActionGroup } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: '[MSAL Auth]',
  events: {
    tryLoginSilent: emptyProps(),
    login: emptyProps(),
    loginSuccess: props<{ authResponse: any }>(),
    logout: emptyProps(),
    logoutSuccess: emptyProps(),
    authError: props<{ err: Error }>(),
  },
});
