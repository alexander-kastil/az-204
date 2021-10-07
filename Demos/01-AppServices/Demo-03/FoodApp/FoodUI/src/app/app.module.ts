import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { SidebarComponent } from "./shared/sidebar/sidebar.component";
import { MainComponent } from "./main/main.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material.module";
import { StoreModule } from "@ngrx/store";
import { reducers, metaReducers } from "./store";
import { EffectsModule } from "@ngrx/effects";
import { environment } from "src/environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { FoodModule } from "./food/food.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FooterComponent } from "./shared/footer/footer.component";
import { ConfigService } from "./shared/config/config.service";
import { ScanComponent } from "./scan/scan/scan.component";
import { ErrHandlerService } from "./shared/err-handler/err-handler.service";
import { FBAuthModule } from "./auth/fbauth.module";

export function appInit(configsrv: ConfigService) {
  return () => configsrv.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    MainComponent,
    HomeComponent,
    AboutComponent,
    FooterComponent,
    ScanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FoodModule,
    FBAuthModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInit,
      multi: true,
      deps: [ConfigService],
    },
    { provide: ErrorHandler, useClass: ErrHandlerService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
