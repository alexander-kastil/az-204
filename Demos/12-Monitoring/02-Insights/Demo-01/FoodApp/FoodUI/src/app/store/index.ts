import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { FoodState, FoodReducer } from '../food/store/reducers/food.reducer';

export interface State {
  food: FoodState;
}

export const reducers: ActionReducerMap<State> = {
  food: FoodReducer
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
