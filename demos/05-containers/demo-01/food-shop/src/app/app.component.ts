import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { of } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    MatSidenavModule,
    RouterOutlet,
    NavbarComponent,
  ]
})
export class AppComponent {
  router = inject(Router);
  title = environment.title;
  isIframe = window !== window.parent && !window.opener;

  authEnabled = environment.authEnabled;
  authenticated = of(true);

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
