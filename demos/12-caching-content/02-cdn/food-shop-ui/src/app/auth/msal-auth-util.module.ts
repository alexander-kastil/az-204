import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  MsalAuthFacade,
  MSALGuardConfigFactory,
  MSALInstanceFactory,
  MSALInterceptorConfigFactory,
} from './state/auth.facade';

import {
  MsalBroadcastService,
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalService,
  MSAL_GUARD_CONFIG,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG,
} from '@azure/msal-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { environment } from '../../environments/environment';
import { LoginComponent } from './components/login/login.component';
import { MsalBroadcastServiceMock } from './mocks/MsalBroadcastService.mock';
import { AuthEffects } from './state/auth.effects';
import { authFeatureKey, authReducer } from './state/auth.reducer';
import { CurrentUserComponent } from './components/current-user/current-user.component';
import { MaterialModule } from '../material.module';

const modules = environment.authEnabled
  ? [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    MsalModule,
  ]
  : [
    CommonModule,
    MaterialModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([]),
  ];

const providers = environment.authEnabled
  ? [
    provideHttpClient(),
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
  declarations: [LoginComponent, CurrentUserComponent],
  exports: [LoginComponent, CurrentUserComponent],
  imports: modules,
  providers: providers,
})
export class MsalAuthUtilModule { }
