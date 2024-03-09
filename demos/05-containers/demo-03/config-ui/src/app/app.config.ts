import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideHttpClient(),
        provideRouter(appRoutes)
    ]
};