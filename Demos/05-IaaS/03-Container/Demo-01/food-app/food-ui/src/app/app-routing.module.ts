import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/login/login.component';
import { AboutComponent } from './about/about.component';
import { MsalGuard } from '@azure/msal-angular';
import { HomeComponent } from './home/home.component';
import { environment } from 'src/environments/environment';

//allow disabling auth for e2e tests
const guards: any[] = environment.authEnabled ? [MsalGuard] : [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent, canActivate: guards },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
    canLoad: guards,
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: !isIframe ? 'enabled' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
