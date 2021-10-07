import { createAction, props } from "@ngrx/store";
import { LoginVM } from "../../login-credential.model";

export const registerUser = createAction(
  "[Auth] register",
  props<{ payload: LoginVM }>()
);

export const registerUserSuccess = createAction(
  "[Auth] register success",
  props<{ payload: any }>()
);

export const loginUser = createAction(
  "[Auth] login",
  props<{ payload: LoginVM }>()
);

export const loginUserSuccess = createAction(
  "[Auth] login success",
  props<{ payload: any }>()
);

export const setToken = createAction(
  "[Auth] set token",
  props<{ payload: string }>()
);

export const logoutUser = createAction("[Auth] logout");

export const logoutUserSuccess = createAction("[Auth] logout success");

export const authFailure = createAction(
  "[Auth] auth failure",
  props<{ err: Error }>()
);

export const loginRedirect = createAction("[Auth] login redirect");
