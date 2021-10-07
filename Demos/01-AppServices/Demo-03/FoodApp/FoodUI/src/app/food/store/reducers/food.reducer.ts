import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { FoodItem } from "../../food.model";
import { deleteFood } from "../actions/food.actions";
import {
  loadFood,
  loadFoodFailure,
  loadFoodSuccess,
  selectFood,
} from "../actions/food.actions";
export const foodFeatureKey = "food";

export interface FoodState extends EntityState<FoodItem> {
  selected: FoodItem;
  loading: boolean;
}

export const foodAdapter: EntityAdapter<FoodItem> =
  createEntityAdapter<FoodItem>();

export const defaultFoodState: FoodState = {
  loading: false,
  ids: [],
  entities: {},
  selected: null,
};

export const initialState = foodAdapter.getInitialState(defaultFoodState);

export const foodReducer = createReducer(
  initialState,
  on(loadFood, (state, action) => {
    return { ...state };
  }),
  on(loadFoodSuccess, (state, action) => {
    return foodAdapter.setAll(action.food, {
      ...state,
      loading: false,
    });
  }),
  on(loadFoodFailure, (state, action) => {
    return { ...state, loading: false };
  }),
  on(deleteFood, (state, action) => {
    return foodAdapter.removeOne(action.food.id, {
      ...state,
      loading: false,
    });
  }),
  on(selectFood, (state, action) => {
    return { ...state, selected: action.food };
  })
);
