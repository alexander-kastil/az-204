import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MsalRedirectComponent } from '@azure/msal-angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MsalAuthUtilModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ErrHandlerService } from './core/err-handler/err-handler.service';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from './material.module';
import { metaReducers, reducers } from './state/state';

registerLocaleData(localeDe);

@NgModule({
  declarations: [AppComponent, AboutComponent, HomeComponent],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    MsalAuthUtilModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrHandlerService },
    { provide: LOCALE_ID, useValue: 'de' },
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
