import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { EuroPipe } from '../pipes/euro.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../../../environments/environment';
import { CartFacade } from 'src/app/shop/state/cart.facade';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    imports: [
        MatToolbarModule,
        MatSlideToggleModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        AsyncPipe,
        EuroPipe
    ]
})
export class SidebarComponent {
  cart = inject(CartFacade);
  router = inject(Router);
  user = of("alexander.kastil@integrations.at");
  ct = this.cart.getItemsCount();
  total = this.cart.getSumTotal();
  persistToCart = this.cart.getPersist();
  items = this.cart.getItems();
  authEnabled = of(false);

  persistCart = environment.features.persistCart;
  fcSaveCart: FormControl<boolean> = new FormControl();
  cartSetting: Subscription | null = null;

  constructor() {
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

  ngOnDestroy() {
    if (this.cartSetting) this.cartSetting.unsubscribe();
  }

  logout() {
    // this.auth.logout();
  }

  doCheckout() {
    this.router.navigate(['/shop/checkout']);
  }
}
