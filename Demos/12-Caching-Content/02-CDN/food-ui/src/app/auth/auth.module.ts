import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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

import { authFeatureKey, authReducer } from './state/auth.reducer';
import { StoreModule } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { MsalBroadcastServiceMock } from './mocks/MsalBroadcastService.mock';

const modules = environment.authEnabled
  ? [
      CommonModule,
      HttpClientModule,
      StoreModule.forFeature(authFeatureKey, authReducer),
      MsalModule,
    ]
  : [
      CommonModule,
      HttpClientModule,
      StoreModule.forFeature(authFeatureKey, authReducer),
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
  declarations: [],
  imports: modules,
  providers: providers,
})
export class MsalAuthUtilModule {}
