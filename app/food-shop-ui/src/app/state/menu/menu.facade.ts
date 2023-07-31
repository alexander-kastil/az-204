import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Store } from '@ngrx/store';
import { combineLatestWith, tap } from 'rxjs/operators';
import { SideNavActions } from './menu.actions';
import { MenuState, menuFeature } from './menu.reducer';

@Injectable({
  providedIn: 'root',
})
export class MenuFacade {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<MenuState>
  ) {
    this.watchScreen.subscribe();
  }

  watchScreen = this.breakpointObserver
    .observe([Breakpoints.XSmall, Breakpoints.Small])
    .pipe(
      combineLatestWith(this.getSideNavEnabled()),
      tap(([point, enabled]) => {
        console.log(point);
      })
    );

  getSideNavEnabled() {
    return this.store.select(menuFeature.selectSideNavEnabled);
  }

  getSideNavVisible() {
    return this.store.select(menuFeature.selectSideNavVisible);
  }

  getSideNavPosition() {
    return this.store.select(menuFeature.selectSideNavPosition);
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
