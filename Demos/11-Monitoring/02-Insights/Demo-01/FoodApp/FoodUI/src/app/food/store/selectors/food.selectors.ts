import {
  foodFeatureKey,
  foodAdapter,
  FoodState
} from '../reducers/food.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const getFoodState = createFeatureSelector<FoodState>(foodFeatureKey);

export const getFoodEntities = createSelector(
  getFoodState,
  foodAdapter.getSelectors().selectAll
);

export const getAllFood = createSelector(
  getFoodEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getSelected = createSelector(
  getFoodState,
  state => state.selected
);
