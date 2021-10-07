import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { MaterialModule } from "../material.module";
import { LogoutComponent } from "./components/logout/logout.component";
import { LoginSplashComponent } from "./components/login-splash/login-splash.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../../environments/environment";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./store/effects/auth.effects";
import { authFeatureKey, authReducer } from "./store/reducers/auth.reducer";

const comps = [
  LoginComponent,
  RegisterComponent,
  LogoutComponent,
  LoginSplashComponent,
];

@NgModule({
  declarations: comps,
  exports: comps,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    StoreModule.forFeature(authFeatureKey, authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class FBAuthModule {}
