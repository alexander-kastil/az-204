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
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MsalAuthResponse } from '../auth.model';
import { loginSuccess, logout } from './auth.actions';
import { MsalAuthState } from './auth.reducer';
import { getUser, isAuthenticated } from './auth.selectors';

@Injectable()
export class MsalAuthFacade {
  constructor(
    private msalBC: MsalBroadcastService,
    private store: Store<MsalAuthState>
  ) {
    this.handleLoginSuccess(this.msalBC);
  }

  getAuthState() {
    return !environment.authEnabled;
  }

  getUser() {
    return this.store.select(getUser);
  }

  isInitAndAuthenticated() {
    return this.store.select(isAuthenticated);
  }

  handleLoginSuccess = (broadcast: MsalBroadcastService) => {
    return broadcast.msalSubject$
      .pipe(
        filter(
          (msg: EventMessage) =>
            msg.eventType === EventType.LOGIN_SUCCESS ||
            msg.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        )
      )
      .subscribe((result: EventMessage) => {
        let resp: MsalAuthResponse = result.payload as MsalAuthResponse;
        this.store.dispatch(loginSuccess({ authResponse: resp }));
        console.log(`MSAL Event ${result.eventType}`, result.payload);
      });
  };

  logout() {
    this.store.dispatch(logout());
  }
}

//app module statics
export const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

export const loggerCallback = (logLevel: LogLevel, message: string) => {
  console.log(logLevel, message);
};

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
