// import { registerLocaleData } from '@angular/common';
// import { provideHttpClient, withInterceptors } from '@angular/common/http';
// import localeDe from '@angular/common/locales/de';
// import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MatSidenavModule } from '@angular/material/sidenav';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MsalRedirectComponent } from '@azure/msal-angular';
// import { EntityDataModule } from '@ngrx/data';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../environments/environment';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { MsalAuthUtilModule } from './auth/msal-auth-util.module';
// import { apimInterceptor } from './shared/apim/apim.interceptor';
// import { ErrHandlerService } from './shared/err-handler/err-handler.service';
// import { NavbarComponent } from './shared/navbar/navbar.component';
// import { SidebarComponent } from './shared/sidebar/sidebar.component';
// import { metaReducers, reducers } from './state/state';

// registerLocaleData(localeDe);

// const bootstrap = environment.authEnabled
//   ? [AppComponent, MsalRedirectComponent]
//   : [AppComponent];

// @NgModule({
//   declarations: [AppComponent],

//   imports: [
//     BrowserModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormsModule,
//     ReactiveFormsModule,
//     StoreModule.forRoot(reducers, {
//       metaReducers,
//       runtimeChecks: {
//         strictStateImmutability: true,
//         strictActionImmutability: true,
//       },
//     }),
//     EffectsModule.forRoot([]),
//     EntityDataModule.forRoot({}),
//     !environment.production ? StoreDevtoolsModule.instrument({ connectInZone: true }) : [],
//     MsalAuthUtilModule,
//     MatSidenavModule,
//     NavbarComponent,
//     SidebarComponent
//   ],
//   providers: [
//     { provide: ErrorHandler, useClass: ErrHandlerService },
//     { provide: LOCALE_ID, useValue: 'de' },
//     provideHttpClient(withInterceptors([apimInterceptor]))
//   ],
//   bootstrap: bootstrap,
// })
// export class AppModule { }