import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartItem } from '../../shop/cart-item.model';
import { StorageService } from '../../shop/storage.service';
import { cartActions } from './cart.actions';

@Injectable()
export class cartEffects {
  actions$ = inject(Actions);
  service = inject(StorageService);

  clearStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.clearStorage),
      mergeMap(() =>
        this.service.clearStorage().pipe(
          map((resp: boolean) =>
            cartActions.storageActionSuccess({ status: resp })
          ),
          catchError((err) => of(cartActions.storageActionFailure({ err })))
        )
      )
    )
  );

  loadFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.loadFromStorage),
      mergeMap(() =>
        this.service.loadFromStorage().pipe(
          map((resp: CartItem[] | null) =>
            cartActions.loadFromStorageSuccess({ items: resp })
          ),
          catchError((err) => of(cartActions.storageActionFailure({ err })))
        )
      )
    )
  );

  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(cartActions.saveToStorage),
      mergeMap((action) =>
        this.service.saveToStorage(action.cart).pipe(
          map((resp: boolean) =>
            cartActions.storageActionSuccess({ status: resp })
          ),
          catchError((err) => of(cartActions.storageActionFailure({ err })))
        )
      )
    )
  );
}
