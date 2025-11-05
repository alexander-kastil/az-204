import { Component, OnDestroy } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { MsalAuthFacade } from './auth/state/auth.facade';
import { MenuFacade } from './state/menu/menu.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = environment.title;
  sidenavMode: MatDrawerMode = 'side';
  sidenavVisible = this.mf.getSideNavVisible();
  isIframe = window !== window.parent && !window.opener;

  authEnabled = environment.authEnabled;
  authenticated = this.af.isAuthenticated();
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
    private af: MsalAuthFacade,
    public mf: MenuFacade,
    private router: Router
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

  getWorbenchStyle() {
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
