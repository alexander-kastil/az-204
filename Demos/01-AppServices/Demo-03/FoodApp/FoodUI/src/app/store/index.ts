import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { environment } from "../../environments/environment";
import { authReducer, AuthState } from "../auth/store/reducers/auth.reducer";
import { foodReducer, FoodState } from "../food/store/reducers/food.reducer";

export interface State {
  food: FoodState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<State> = {
  food: foodReducer,
  auth: authReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
