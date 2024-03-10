import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory,
  MsalAuthFacade,
} from './state/auth.facade';

import {
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { LoginComponent } from './components/login/login.component';
import { MsalBroadcastServiceMock } from './mocks/MsalBroadcastService.mock';
import { AuthEffects } from './state/auth.effects';
import { authState } from './state/auth.state';

const modules = environment.authEnabled
  ? [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(authState),
    EffectsModule.forFeature([AuthEffects]),
    MsalModule,
  ]
  : [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(authState),
    EffectsModule.forFeature([]),
  ];

const providers = environment.authEnabled
  ? [
    MsalAuthFacade,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
    },
    {
      provide: MSAL_GUARD_CONFIG,
      useFactory: MSALGuardConfigFactory,
    },
    {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory,
    },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ]
  : [
    MsalAuthFacade,
    { provide: MsalBroadcastService, useClass: MsalBroadcastServiceMock },
  ];

@NgModule({
  exports: [LoginComponent, CurrentUserComponent],
  imports: [...modules, LoginComponent, CurrentUserComponent],
  providers: providers,
})
export class MsalAuthUtilModule { }
