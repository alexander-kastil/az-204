import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { EntityDataModule } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalAuthUtilModule } from './auth/msal-auth-util.module';
import { ErrHandlerService } from './common/err-handler/err-handler.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { MenusModule } from './menus/menus.module';
import { metaReducers, reducers } from './state/state';

registerLocaleData(localeDe);

const bootstrap = environment.authEnabled
  ? [AppComponent, MsalRedirectComponent]
  : [AppComponent];

@NgModule({ declarations: [AppComponent, AboutComponent, HomeComponent],
    bootstrap: bootstrap, imports: [BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true,
            },
        }),
        EffectsModule.forRoot([]),
        EntityDataModule.forRoot({}),
        !environment.production ? StoreDevtoolsModule.instrument({ connectInZone: true }) : [],
        MsalAuthUtilModule,
        MenusModule], providers: [
        { provide: ErrorHandler, useClass: ErrHandlerService },
        { provide: LOCALE_ID, useValue: 'de' },
        provideHttpClient(withInterceptorsFromDi()),
    ] })
export class AppModule {}
