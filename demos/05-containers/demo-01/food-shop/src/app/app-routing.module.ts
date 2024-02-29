import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { environment } from '../environments/environment';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

//allow disabling auth for e2e tests
const guards: any[] = environment.authEnabled ? [MsalGuard] : [];

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then((m) => m.FoodModule),
  },
];

const isIframe = window !== window.parent && !window.opener;

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: isIframe == false ? 'enabledNonBlocking' : 'disabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
