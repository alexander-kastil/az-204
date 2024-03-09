import { Injectable } from '@angular/core';
import {
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalInterceptorConfiguration,
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  EventMessage,
  EventType,
  InteractionType,
  IPublicClientApplication,
  LogLevel,
  PublicClientApplication,
} from '@azure/msal-browser';
import { Store } from '@ngrx/store';
import { combineLatestWith, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MsalBroadcastServiceMock } from '../mocks/MsalBroadcastService.mock';
import { AuthActions } from './auth.actions';
import { MsalAuthState } from './auth.reducer';
import { getAuthEnabled, getLoggedIn, getUser } from './auth.selectors';

@Injectable()
export class MsalAuthFacade {
  constructor(
    private msalBC: MsalBroadcastService,
    private store: Store<MsalAuthState>
  ) {
    this.handleLoginSuccess(this.msalBC);
  }

  getUser() {
    return this.store.select(getUser);
  }

  getAuthEnabled() {
    return this.store.select(getAuthEnabled);
  }

  isAuthenticated() {
    return this.store.select(getLoggedIn).pipe(
      combineLatestWith(this.store.select(getAuthEnabled)),
      map(([loggedIn, authEnabled]) => {
        return authEnabled == false || loggedIn;
      })
    );
  }

  handleLoginSuccess = (
    broadcast: MsalBroadcastService | MsalBroadcastServiceMock
  ) => {
    return broadcast.msalSubject$
      .pipe(
        tap((msg: EventMessage) => console.log('MSAL Event', msg)),
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ),
        tap((msg: EventMessage) =>
          console.log('LOGIN_SUCCESS or ACQUIRE_TOKEN_SUCCESS', msg)
        )
      )
      .subscribe((result: EventMessage) => {
        this.store.dispatch(
          AuthActions.loginSuccess({ authResponse: result.payload })
        );
        console.log(`MSAL Event ${result.eventType}`, result.payload);
      });
  };

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}

//app module statics
export const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const loggerCallback = (logLevel: LogLevel, message: string) => {
  console.log(logLevel, message);
};

//https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/initialization.md
export function MSALInstanceFactory(): IPublicClientApplication {
  let config = {
    auth: {
      clientId: environment.azure.appReg.clientId,
      authority: environment.azure.appReg.authority,
      redirectUri: '/',
    },
    cache: {
      cacheLocation: BrowserCacheLocation.LocalStorage,
      storeAuthStateInCookie: isIE, // set to true for IE 11
    },
    system: {
      loggerOptions: {
        loggerCallback,
        logLevel: LogLevel.Info,
        piiLoggingEnabled: false,
      },
    },
  };
  return new PublicClientApplication(config);
}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  let scopes = environment.azure.appReg.scopes as unknown as Map<
    string,
    Array<string>
  >;
  const protectedResourceMap = new Map<string, Array<string>>(scopes);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap,
  };
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect,
    authRequest: {
      scopes: ['user.read'],
    },
  };
}
