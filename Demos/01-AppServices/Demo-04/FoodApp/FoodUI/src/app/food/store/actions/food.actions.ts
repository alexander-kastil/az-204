import { Action } from "@ngrx/store";
import { FoodItem } from "../../food.model";

export enum FoodActionTypes {
  LoadFood = "[Food] Load Foods",
  LoadFood_Success = "[Food] LoadFood_Success",
  LoadFood_Error = "[Food] LoadFood_Error",
  SelectFood = "[Food] SelectFood",
}

export class LoadFood implements Action {
  readonly type = FoodActionTypes.LoadFood;
}

export class LoadFood_Success implements Action {
  readonly type = FoodActionTypes.LoadFood_Success;
  constructor(public payload: FoodItem[]) {}
}

export class LoadFood_Error implements Action {
  readonly type = FoodActionTypes.LoadFood_Error;
  constructor(public payload: Error) {}
}

export class SelectFood implements Action {
  readonly type = FoodActionTypes.SelectFood;
  constructor(public payload: FoodItem) {}
}

export type FoodActions =
  | LoadFood
  | LoadFood_Success
  | LoadFood_Error
  | SelectFood;
