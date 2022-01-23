import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { FoodService } from '../food.service';
import * as foodActions from './food.actions';

@Injectable()
export class FoodEffects {
  constructor(private actions$: Actions, private fs: FoodService) {}

  loadFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.loadFood),
      mergeMap(() =>
        this.fs.getFood().pipe(
          map((food) => ({
            type: '[Food] load food success',
            food: food,
          })),
          catchError((err) => of(foodActions.loadFoodFailure({ err })))
        )
      )
    )
  );

  deleteFood$ = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.deleteFood),
      mergeMap((action) =>
        this.fs.deleteFood(action.food.id as number).pipe(
          map(() => ({
            type: '[Food] delete food success',
            food: action.food,
          })),
          catchError((err) => of(foodActions.deleteFoodFailure({ err })))
        )
      )
    )
  );

  addFood = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.addFood),
      mergeMap((action) =>
        this.fs.addFood(action.food).pipe(
          map((food) => ({
            type: '[Food] add food success',
            food: food,
          })),
          catchError((err) => of(foodActions.addFoodFailure({ err })))
        )
      )
    )
  );

  updateFood = createEffect(() =>
    this.actions$.pipe(
      ofType(foodActions.updateFood),
      mergeMap((action) =>
        this.fs.addFood(action.food).pipe(
          map((food) => ({
            type: '[Food] update food success',
            food: food,
          })),
          catchError((err) => of(foodActions.updateFoodFailure({ err })))
        )
      )
    )
  );
}
