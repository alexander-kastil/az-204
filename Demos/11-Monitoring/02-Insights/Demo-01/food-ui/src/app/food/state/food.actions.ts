import { createAction, props } from '@ngrx/store';
import { FoodItem } from '../food.model';

export const loadFood = createAction('[Food] load food');

export const loadFoodSuccess = createAction(
  '[Food] load food success',
  props<{ food: FoodItem[] }>()
);

export const loadFoodFailure = createAction(
  '[Food] load food failure',
  props<{ err: Error }>()
);

export const selectFood = createAction(
  '[Food] select food',
  props<{ food: FoodItem | null }>()
);

export const addNewFood = createAction('[Food] add new food');

export const logActivity = createAction(
  '[Food] log activity',
  props<{ data: any }>()
);

export const deleteFood = createAction(
  '[Food] delete food',
  props<{ food: FoodItem }>()
);

export const deleteFoodSuccess = createAction(
  '[Food] delete food success',
  props<{ food: FoodItem }>()
);

export const deleteFoodFailure = createAction(
  '[Food] delete food failure',
  props<{ err: Error }>()
);

export const addFood = createAction(
  '[Food] add food',
  props<{ food: FoodItem }>()
);

export const addFoodSuccess = createAction(
  '[Food] add food success',
  props<{ food: FoodItem }>()
);

export const addFoodFailure = createAction(
  '[Food] add food failure',
  props<{ err: Error }>()
);

export const updateFood = createAction(
  '[Food] update food',
  props<{ food: FoodItem }>()
);

export const updateFoodSuccess = createAction(
  '[Food] update food success',
  props<{ food: FoodItem }>()
);

export const updateFoodFailure = createAction(
  '[Food] update food failure',
  props<{ err: Error }>()
);
