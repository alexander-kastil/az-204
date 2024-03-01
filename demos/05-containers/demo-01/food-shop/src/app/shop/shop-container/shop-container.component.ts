import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription, combineLatestWith, map, skip, startWith } from 'rxjs';
import { FoodEntityService } from 'src/app/catalog/state/food-entity.service';
import { environment } from 'src/environments/environment';
import { CartItem } from '../cart-item.model';
import { ShopItemComponent } from '../shop-item/shop-item.component';
import { CartFacade } from '../state/cart.facade';

@Component({
  selector: 'app-shop-container',
  standalone: true,
  imports: [
    ShopItemComponent,
    AsyncPipe
  ],
  templateUrl: './shop-container.component.html',
  styleUrl: './shop-container.component.scss'
})
export class ShopContainerComponent {
  destroyRef = inject(DestroyRef);
  service = inject(FoodEntityService);
  cart = inject(CartFacade);
  food = this.service.entities$;
  cartItems = this.cart.getItems();
  cartSubs: Subscription | null = null;
  persistCart = environment.features.persistCart;

  constructor() {
    if (this.persistCart) {
      this.ensureStorageFeature();
    }
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

  getItemsInCart(id: number) {
    return this.cartItems.pipe(
      map((items) => {
        let ct = items.find((i) => i.id === id);
        return ct ? ct.quantity : 0;
      })
    );
  }

  updateCart(f: CartItem) {
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
