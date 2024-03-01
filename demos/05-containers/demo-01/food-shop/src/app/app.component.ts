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
export class AppComponent implements OnDestroy {
  router = inject(Router);
  mf = inject(SidenavFacade);
  title = environment.title;
  sidenavMode: MatDrawerMode = 'side';
  sidenavVisible = this.mf.getSideNavVisible();
  isIframe = window !== window.parent && !window.opener;

  authEnabled = environment.authEnabled;
  authenticated = of(true)
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

  private destroy$ = new Subject();

  constructor(
  ) {
    this.mf.getSideNavPosition()
      .pipe(takeUntil(this.destroy$))
      .subscribe((mode: string) => {
        this.sidenavMode = mode as MatDrawerMode;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getWorkbenchStyle() {
    let result = {};
    this.mf.getSideNavVisible()
      .pipe(takeUntil(this.destroy$))
      .subscribe((visible: boolean) => {
        result = visible
          ? {
            'padding-left': '10px',
          }
          : {};
      });
    return result;
  }
}
