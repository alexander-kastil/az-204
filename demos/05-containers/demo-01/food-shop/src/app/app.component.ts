import { Component, OnDestroy, inject } from '@angular/core';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, of, takeUntil } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { SidenavFacade } from './state/sidenav/sidenav.facade';
import { LoginComponent } from './auth/components/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AsyncPipe, NgStyle } from '@angular/common';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MsalAuthFacade } from './auth/state/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    MatSidenavModule,
    AsyncPipe,
    NgStyle,
    RouterOutlet,
    LoginComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class AppComponent {
  router = inject(Router);
  auth = inject(MsalAuthFacade);
  title = environment.title;
  isIframe = window !== window.parent && !window.opener;

  authEnabled = environment.authEnabled;
  authenticated = this.auth.isAuthenticated();
  publicRoute = this.router.events.pipe(
    startWith(false),
    filter((e) => e instanceof NavigationEnd),
    map((event) => {
      return event instanceof NavigationEnd && event.url.includes('about');
    }),
    tap((result) => {
      console.log('publicRoute', result);
    })
  );
}
