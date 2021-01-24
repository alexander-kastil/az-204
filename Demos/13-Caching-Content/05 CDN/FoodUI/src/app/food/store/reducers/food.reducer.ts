import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { FoodItem } from "../../food.model";
import { FoodActions, FoodActionTypes } from "../actions/food.actions";

export const foodFeatureKey = "food";

export interface FoodState extends EntityState<FoodItem> {
  selected: FoodItem;
}

export const foodAdapter: EntityAdapter<FoodItem> = createEntityAdapter<
  FoodItem
>();

export const defaultFoodState: FoodState = {
  ids: [],
  entities: {},
  selected: null,
};

export const initialState = foodAdapter.getInitialState(defaultFoodState);

export function FoodReducer(
  state = initialState,
  action: FoodActions
): FoodState {
  switch (action.type) {
    case FoodActionTypes.LoadFood: {
      return state;
    }
    case FoodActionTypes.LoadFood_Success: {
      return foodAdapter.addAll(action.payload, {
        ...state,
      });
    }
    case FoodActionTypes.LoadFood_Error: {
      return { ...state };
    }
    case FoodActionTypes.SelectFood: {
      return { ...state, selected: action.payload };
    }
    default:
      return state;
  }
}
