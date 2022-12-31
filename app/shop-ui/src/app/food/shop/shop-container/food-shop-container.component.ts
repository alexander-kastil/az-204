import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatestWith,
  map,
  skip,
  startWith,
  Subject,
  Subscription,
  takeUntil,
} from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartFacade } from '../../state/cart/cart.facade';
import { FoodEntityService } from '../../state/catalog/food-entity.service';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-food-shop-contaiener',
  templateUrl: './food-shop-container.component.html',
  styleUrls: ['./food-shop-container.component.scss'],
})
export class FoodShopContaienerComponent implements OnInit, OnDestroy {
  food = this.foodService.entities$;
  cartItems = this.cart.getItems();

  cartSubs: Subscription | null = null;
  persistCart = environment.features.persistCart;

  private destroy$ = new Subject();

  constructor(
    private foodService: FoodEntityService,
    private cart: CartFacade
  ) {
    if (this.persistCart) {
      this.ensureStorageFeature();
    }
  }

  ngOnInit(): void {
    this.foodService.loaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe((loaded) => {
        if (!loaded) {
          this.foodService.getAll();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
        skip(1),
        combineLatestWith(this.cart.getPersist().pipe(startWith(true))),
        map(([items, persist]) => {
          if (persist) {
            this.cart.saveToStorage(items);
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.cart
      .getPersist()
      .pipe(takeUntil(this.destroy$))
      .subscribe((persist) => {
        if (persist) {
          this.cart.loadFromStorage();
        }
      });
  }
}
