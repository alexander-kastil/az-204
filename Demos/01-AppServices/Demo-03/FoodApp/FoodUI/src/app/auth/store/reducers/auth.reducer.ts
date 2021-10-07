import { environment } from "src/environments/environment";
import { fakeToken } from "./fake-token";
import { createReducer, on } from "@ngrx/store";
import {
  authFailure,
  loginUserSuccess,
  logoutUserSuccess,
  registerUserSuccess,
  setToken,
} from "../actions/auth.actions";

export const authFeatureKey = "auth";

export interface AuthState {
  user: any;
  token: string | null;
  isLoggedIn: boolean;
}

export const initialState: AuthState = {
  user: {},
  token: "",
  isLoggedIn: false,
};

export const authReducer = createReducer(
  initialState,
  on(registerUserSuccess, (state, action) => {
    return { ...state, isLoggedIn: true, user: "Mock User" };
  }),
  on(loginUserSuccess, (state, action) => {
    return { ...state, isLoggedIn: true, user: action.payload };
  }),
  on(logoutUserSuccess, (state, action) => {
    return { ...state, isLoggedIn: false, user: null, token: null };
  }),
  on(setToken, (state, action) => {
    return { ...state, token: action.payload };
  }),
  on(authFailure, (state, action) => {
    return { ...state, isLoggedIn: false, user: null, token: null };
  })
);
