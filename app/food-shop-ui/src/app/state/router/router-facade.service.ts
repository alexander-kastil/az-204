import { Injectable } from '@angular/core';
import { RouterState } from '@angular/router';
import { Store } from '@ngrx/store';
import { getComponent } from './router.selectors';

@Injectable({
  providedIn: 'root',
})
export class RouterFacadeService {
  constructor(private store: Store<RouterState>) {}

  getComponent() {
    return this.store.select(getComponent);
  }
}
