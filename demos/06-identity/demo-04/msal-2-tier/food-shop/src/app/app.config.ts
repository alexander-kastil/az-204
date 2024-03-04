import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { DefaultDataServiceConfig, provideEntityData, withEffects } from '@ngrx/data';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { appRoutes } from './app.routes';
import { apimInterceptor } from './shared/apim/apim.interceptor';
import { sidenavState } from './state/sidenav/sidenav.state';
import { foodDataServiceConfig } from './catalog/state/food-data.service.config';
import { foodEntityConfig } from './catalog/state/food.metadata';
import { cartState } from './shop/state/cart.state';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(withInterceptors([apimInterceptor])),
        provideRouter(appRoutes),
        provideAnimations(),
        provideStore(),
        provideEffects(),
        //NgRx State slices
        provideState(sidenavState),
        provideState(cartState),
        //NgRx Data
        provideEntityData(foodEntityConfig, withEffects()),
        { provide: DefaultDataServiceConfig, useValue: foodDataServiceConfig },
        //NgRx DevTools
        provideStoreDevtools({ maxAge: 25 }),
    ]
};