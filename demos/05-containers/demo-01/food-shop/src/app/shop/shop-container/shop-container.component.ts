import { AsyncPipe, NgStyle } from '@angular/common';
import { Component, DestroyRef, computed, inject } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Subscription, combineLatestWith, map, skip, startWith } from 'rxjs';
import { CatalogItem } from 'src/app/catalog/catalog-item.model';
import { FoodEntityService } from 'src/app/catalog/state/food-entity.service';
import { SidebarComponent } from 'src/app/shared/sidebar/sidebar.component';
import { SidenavFacade } from 'src/app/state/sidenav/sidenav.facade';
import { environment } from 'src/environments/environment';
import { CartItem } from '../cart-item.model';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { CartFacade } from '../state/cart.facade';
import { AILoggerService } from 'src/app/shared/logger/ai-logger.service';

@Component({
  selector: 'app-shop-container',
  imports: [
    MatSidenavModule,
    AsyncPipe,
    NgStyle,
    SidebarComponent,
    ShopItemComponent,
  ],
  templateUrl: './shop-container.component.html',
  styleUrl: './shop-container.component.scss'
})
export class ShopContainerComponent {
  destroyRef = inject(DestroyRef);
  service = inject(FoodEntityService);
  cart = inject(CartFacade);
  mf = inject(SidenavFacade);
  ai = inject(AILoggerService);
  food = toSignal<CatalogItem[]>(this.service.entities$);
  cartItems = toSignal<CartItem[]>(this.cart.getItems());

  // sidenav
  sidenavMode: MatDrawerMode = 'side';
  sidenavVisible = this.mf.getSideNavVisible();
  // private destroy$ = new Subject();

  // shopping cart
  cartSubs: Subscription | null = null;
  persistCart = environment.features.persistCart;

  constructor() {
    if (this.persistCart) {
      this.ensureStorageFeature();
    }
    this.mf.getSideNavPosition()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((mode: string) => {
        this.sidenavMode = mode as MatDrawerMode;
      });
  }

  ngOnInit(): void {
    this.service.loaded$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((loaded) => {
        if (!loaded) {
          this.service.getAll();
        }
      });
  }

  // sidenav
  getWorkbenchStyle() {
    let result = {};
    this.mf.getSideNavVisible()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((visible: boolean) => {
        result = visible
          ? {
            'padding-left': '10px',
          }
          : {};
      });
    return result;
  }

  // shopping cart
  getItemsInCart(id: number) {
    return computed(() => {
      const items = this.cartItems();
      let ct = (items as CartItem[]).find((i: CartItem) => i.id === id);
      return ct ? ct.quantity : 0;
    });
  }

  updateCart(f: CartItem) {
    this.ai.logEvent('cart', { action: 'update', item: f });
    this.cart.set(f);
  }

  ensureStorageFeature() {
    this.cartSubs = this.cart
      .getItems()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        skip(1),
        combineLatestWith(this.cart.getPersist().pipe(startWith(true))),
        map(([items, persist]) => {
          if (persist) {
            this.cart.saveToStorage(items);
          }
        }),
      )
      .subscribe();

    this.cart
      .getPersist()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((persist) => {
        if (persist) {
          this.cart.loadFromStorage();
        }
      });
  }
}
