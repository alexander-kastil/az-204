import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { CartItem } from '../../shop/cart-item.model';
import { StorageService } from '../../shop/storage.service';
import { CartActions } from './cart.actions';

@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private service: StorageService) {}

  clearStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.clearstorage),
      mergeMap(() =>
        this.service.clearStorage().pipe(
          map((resp: boolean) =>
            CartActions.storageactionsuccess({ status: resp })
          ),
          catchError((err) => of(CartActions.storageactionfailure({ err })))
        )
      )
    )
  );

  loadFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadfromstorage),
      mergeMap(() =>
        this.service.loadFromStorage().pipe(
          map((resp: CartItem[] | null) =>
            CartActions.loadfromstoragesuccess({ items: resp })
          ),
          catchError((err) => of(CartActions.storageactionfailure({ err })))
        )
      )
    )
  );

  saveToStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.savetostorage),
      mergeMap((action) =>
        this.service.saveToStorage(action.cart).pipe(
          map((resp: boolean) =>
            CartActions.storageactionsuccess({ status: resp })
          ),
          catchError((err) => of(CartActions.storageactionfailure({ err })))
        )
      )
    )
  );
}
