import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { SideNavActions } from './menu.actions';
import { MenuState } from './menu.reducer';
import { MatDrawerMode } from '@angular/material/sidenav';
import {
  getSideNavEnabled,
  getSideNavVisible,
  getSideNavPosition,
} from './menu.selectors';

@Injectable({
  providedIn: 'root',
})
export class MenuFacade {
  constructor(
    private mediaObserver: MediaObserver,
    private store: Store<MenuState>
  ) {
    this.init();
  }

  get sideNavEnabled() {
    return this.store.select(getSideNavEnabled);
  }

  get sideNavVisible() {
    return this.store.select(getSideNavVisible);
  }

  get sideNavPosition() {
    return this.store.select(getSideNavPosition);
  }

  private init() {
    combineLatest([
      this.mediaObserver.asObservable().pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      ),
      this.sideNavEnabled,
    ]).subscribe(([change, enabled]) => {
      const visible = this.adjustSidenavToScreen(change.mqAlias);
      const position = this.adjustSidenavToScreen(change.mqAlias)
        ? 'side'
        : 'over';

      this.store.dispatch(SideNavActions.setsidenavvisible({ visible }));
      this.store.dispatch(SideNavActions.setsidenavposition({ position }));
    });
  }

  setSideNavEnabled(val: boolean) {
    this.store.dispatch(SideNavActions.setsidenavenabled({ enabled: val }));
  }

  adjustSidenavToScreen(mq: string): boolean {
    return mq == 'xs' ? false : true;
  }

  toggleMenuVisibility() {
    this.store.dispatch(SideNavActions.togglesidenav());
  }
}
