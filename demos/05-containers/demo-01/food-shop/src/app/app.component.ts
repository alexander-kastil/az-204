import { AsyncPipe, NgStyle, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { LoginComponent } from './auth/components/login/login.component';
import { MsalAuthFacade } from './auth/state/auth.facade';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

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


  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.setMSALIframe();
  }

  setMSALIframe() {
    console.log('setMSALIframe', this.isIframe);
    if (isPlatformBrowser(this.platformId)) {
      // Use the window reference: this.windowRef
      this.isIframe = window !== window.parent && !window.opener
    }
  }

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
