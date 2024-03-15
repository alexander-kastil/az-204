import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { DefaultDataServiceConfig, EntityDataService, provideEntityData, withEffects } from '@ngrx/data';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { apimInterceptor } from './shared/apim/apim.interceptor';
import { sidenavState } from './state/sidenav/sidenav.state';
import { foodDataServiceConfig } from './catalog/state/food-data.service.config';
import { foodEntityConfig } from './catalog/state/food.metadata';
import { cartState } from './shop/state/cart.state';
import { FoodDataService } from './catalog/state/food-data.service';

import { MsalInterceptor, MSAL_INSTANCE, MSAL_GUARD_CONFIG, MSAL_INTERCEPTOR_CONFIG, MsalService, MsalGuard, MsalBroadcastService } from '@azure/msal-angular';
import { MSALInstanceFactory, MSALGuardConfigFactory, MSALInterceptorConfigFactory } from './auth/state/auth.facade';
import { authState } from './auth/state/auth.state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(
            withInterceptorsFromDi(),
            withInterceptors([apimInterceptor])
        ),
        provideRouter(
            appRoutes,
            withComponentInputBinding()
        ),
        provideAnimations(),
        provideStore(),
        provideEffects(),
        // NgRx State slices
        provideState(sidenavState),
        provideState(cartState),
        // NGRX State auth
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MSALGuardConfigFactory
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MSALInterceptorConfigFactory
        },
        MsalService,
        MsalGuard,
        MsalBroadcastService,
        provideState(authState),
        // NgRx Data
        provideEntityData(foodEntityConfig, withEffects()),
        { provide: DefaultDataServiceConfig, useValue: foodDataServiceConfig },
        // NgRx Data Custom Data Service 
        {
            provide: ENVIRONMENT_INITIALIZER,
            useValue() {
                const entityDataService = inject(EntityDataService);
                const foodDataService = inject(FoodDataService);
                entityDataService.registerService('Food', foodDataService);
            },
            multi: true,
        },
        // NgRx DevTools
        provideStoreDevtools({ maxAge: 25 }),
    ]
};