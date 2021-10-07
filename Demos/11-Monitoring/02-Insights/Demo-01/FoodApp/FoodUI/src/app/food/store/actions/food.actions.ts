import { createAction, props } from "@ngrx/store";
import { FoodItem } from "../../food.model";

export const loadFood = createAction("[Food] load food");

export const loadFoodSuccess = createAction(
  "[Food] load food success",
  props<{ food: FoodItem[] }>()
);

export const loadFoodFailure = createAction(
  "[Food] load food failure",
  props<{ err: Error }>()
);

export const selectFood = createAction(
  "[Food] select food",
  props<{ food: FoodItem }>()
);

export const mailFood = createAction(
  "[Food] mail food",
  props<{ food: FoodItem }>()
);

export const logActivity = createAction(
  "[Food] log activity",
  props<{ data: any }>()
);

export const deleteFood = createAction(
  "[Food] delete food",
  props<{ food: FoodItem }>()
);

export const deleteFoodSuccess = createAction(
  "[Food] delete food success",
  props<{ food: FoodItem }>()
);

export const deleteFoodFailure = createAction(
  "[Food] delete food failure",
  props<{ err: Error }>()
);

export const saveFood = createAction(
  "[Food] save food",
  props<{ food: FoodItem }>()
);

export const saveFoodSuccess = createAction(
  "[Food] save food success",
  props<{ food: FoodItem }>()
);

export const saveFoodFailure = createAction(
  "[Food] save food failure",
  props<{ err: Error }>()
);
