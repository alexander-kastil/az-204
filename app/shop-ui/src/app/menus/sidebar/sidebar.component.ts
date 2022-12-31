import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { MsalAuthFacade } from 'src/app/auth/state/auth.facade';
import { environment } from 'src/environments/environment';
import { CartFacade } from '../../food/state/cart/cart.facade';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  user = this.auth.getUser();
  ct = this.cart.getItemsCount();
  total = this.cart.getSumTotal();
  persistToCart = this.cart.getPersist();
  items = this.cart.getItems();
  authEnabled = this.auth.getAuthEnabled();

  persistCart = environment.features.persistCart;
  fcSaveCart: FormControl<boolean> = new FormControl();
  cartSetting: Subscription | null = null;

  constructor(
    public cart: CartFacade,
    private router: Router,
    public auth: MsalAuthFacade
  ) {
    if (this.persistCart) {
      this.ensureStorageFeature();
    }
  }

  ensureStorageFeature() {
    this.fcSaveCart = new FormControl<boolean>(true, { nonNullable: true });
    this.cartSetting = this.fcSaveCart.valueChanges
      .pipe(
        map((persist) => {
          this.cart.togglePersist(persist);
        })
      )
      .subscribe();
  }

  ngonDestroy() {
    if (this.cartSetting) this.cartSetting.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }

  doCheckout() {
    this.router.navigate(['/food/checkout']);
  }
}
