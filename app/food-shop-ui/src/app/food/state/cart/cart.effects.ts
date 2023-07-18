import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartItem } from '../../shop/cart-item.model';
import { StorageService } from '../../shop/storage.service';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
  actions$ = inject(Actions);
  service = inject(StorageService);

  clearStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearStorage),
      mergeMap(() =>
        this.service.clearStorage().pipe(
          map((resp: boolean) =>
            CartActions.storageActionSuccess({ status: resp })
          ),
          catchError((err) => of(CartActions.storageActionFailure({ err })))
        )
      )
    )
  );

  loadFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadFromStorage),
      mergeMap(() =>
        this.service.loadFromStorage().pipe(
          map((resp: CartItem[] | null) =>
            CartActions.loadFromStorageSuccess({ items: resp })
          ),
          catchError((err) => of(CartActions.storageActionFailure({ err })))
        )
      )
    )
  );

  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.saveToStorage),
      mergeMap((action) =>
        this.service.saveToStorage(action.cart).pipe(
          map((resp: boolean) =>
            CartActions.storageActionSuccess({ status: resp })
          ),
          catchError((err) => of(CartActions.storageActionFailure({ err })))
        )
      )
    )
  );
}
