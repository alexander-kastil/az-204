import { Injectable } from "@angular/core";
import { Actions, Effect, ofType, createEffect } from "@ngrx/effects";
import { exhaustMap, pluck, mergeMap, map, catchError } from "rxjs/operators";
import { FBAuthService } from "../../firebase-auth.service";
import { LoginVM } from "../../login-credential.model";
import {
  authFailure,
  loginUser,
  logoutUser,
  registerUser,
} from "../actions/auth.actions";
import { from, of } from "rxjs";

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private as: FBAuthService) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      pluck("payload"),
      exhaustMap((payload: LoginVM) =>
        this.as.logOn(payload.email, payload.password).pipe(
          map((data) => ({
            type: "[Auth] login success",
            payload: data,
          })),
          catchError((err) => of(authFailure({ err })))
        )
      )
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      pluck("payload"),
      exhaustMap((payload: LoginVM) =>
        this.as.registerUser(payload.email, payload.password).pipe(
          map((data) => ({
            type: "[Auth] register success",
            payload: data,
          })),
          catchError((err) => of(authFailure({ err })))
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logoutUser),
      pluck("payload"),
      exhaustMap(() =>
        this.as.logOff().pipe(
          map(() => ({
            type: "[Auth] logout success",
          })),
          catchError((err) => of(authFailure({ err })))
        )
      )
    )
  );
}
