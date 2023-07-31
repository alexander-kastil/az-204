import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatestWith, tap } from 'rxjs/operators';
import { SideNavActions } from './sidenav.actions';
import { SidenavState, sidenavFeature } from './sidenav.state';

@Injectable({
  providedIn: 'root',
})
export class SidenavFacade {
  breakpointObserver = inject(BreakpointObserver);
  store = inject(Store<SidenavState>);
  constructor() { this.watchScreen.subscribe(); }

  watchScreen = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      combineLatestWith(this.getSideNavEnabled()),
      tap(([point, enabled]) => {
        console.log(point);
      })
    );

  getSideNavEnabled() {
    return this.store.select(sidenavFeature.selectSideNavEnabled);
  }

  getSideNavVisible() {
    return this.store.select(sidenavFeature.selectSideNavVisible);
  }

  getSideNavPosition() {
    return this.store.select(sidenavFeature.selectSideNavPosition);
  }

  setSideNavEnabled(val: boolean) {
    this.store.dispatch(SideNavActions.setSideNavEnabled({ enabled: val }));
  }

  adjustSidenavToScreen(mq: string): boolean {
    return mq == 'xs' ? false : true;
  }

  toggleMenuVisibility() {
    this.store.dispatch(SideNavActions.toggleSideNav());
  }
}
