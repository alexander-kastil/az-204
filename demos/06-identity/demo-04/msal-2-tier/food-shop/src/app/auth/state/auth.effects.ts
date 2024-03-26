import { Injectable, inject } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { SilentRequest } from '@azure/msal-browser';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthActions } from './auth.actions';

@Injectable()
export class AuthEffects {
  actions$ = inject(Actions);
  msal = inject(MsalService);

  req: SilentRequest = {
    scopes: ['user.read'],
    account: this.msal.instance.getAllAccounts()[0],
  };

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      mergeMap(() =>
        this.msal.logout().pipe(
          map((resp) => AuthActions.logoutSuccess()),
          catchError((err) => of(AuthActions.authError({ err })))
        )
      )
    )
  );
}
