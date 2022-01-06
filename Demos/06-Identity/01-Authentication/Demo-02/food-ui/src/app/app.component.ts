import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { MsalAuthFacade } from './auth/state/auth.facade';
import { ConfigService } from './core/config/config.service';
import { FoodFacade } from './food/state/food.facade';
import { MenuFacade } from './state/menu/menu.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Passion for Food!';
  authenticated: boolean = false;
  sidenavMode: MatDrawerMode = 'side';
  sidenavVisible = this.mf.sideNavVisible;
  isIframe = window !== window.parent && !window.opener;

  constructor(
    private af: MsalAuthFacade,
    public mf: MenuFacade,
    public ff: FoodFacade,
    public cs: ConfigService
  ) {}

  ngOnInit(): void {
    this.mf.sideNavPosition.subscribe(
      (mode) => (this.sidenavMode = mode as MatDrawerMode)
    );

    this.af.cfgInitAndAuthenticated().subscribe((proceed) => {
      if (proceed) {
        this.authenticated = proceed;
      }
    });
  }

  getWorbenchStyle() {
    let result = {};
    this.mf.sideNavVisible.subscribe((visible) => {
      result = visible
        ? {
            'padding-left': '10px',
          }
        : {};
    });
    return result;
  }
}
