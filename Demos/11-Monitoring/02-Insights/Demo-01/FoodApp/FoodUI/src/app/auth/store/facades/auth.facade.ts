import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";
import { LoginVM } from "../../login-credential.model";
import {
  getUser,
  getLoggedIn,
  hasToken,
  displayAuth,
} from "../selectors/auth.selectors";
import { map } from "rxjs/operators";
import { environment } from "../../../../environments/environment";
import {
  loginUser,
  logoutUser,
  registerUser,
  setToken,
  loginRedirect,
} from "../actions/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthFacade {
  constructor(private store: Store<AuthState>) {}

  get User() {
    return this.store.select(getUser);
  }

  isAuthenticated() {
    return this.store
      .select(getLoggedIn)
      .pipe(map((loggedIn) => environment.authEnabled == false || loggedIn));
  }

  hasToken() {
    return this.store
      .select(hasToken)
      .pipe(map((token) => environment.authEnabled == false || token));
  }

  logIn(payload: LoginVM) {
    this.store.dispatch(loginUser({ payload }));
  }

  logOff() {
    this.store.dispatch(logoutUser());
  }

  register(payload: LoginVM) {
    this.store.dispatch(registerUser({ payload }));
  }

  redirectToLogin() {
    this.store.dispatch(loginRedirect());
  }

  userChanged(user: any) {
    if (user != null) {
      user
        .getIdToken()
        .then((payload) => this.store.dispatch(setToken({ payload })));
    }
  }

  displayAuth() {
    return this.store.select(displayAuth);
  }
}
