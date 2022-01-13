import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { FoodItem } from '../food.model';
import {
  updateFoodFailure,
  updateFoodSuccess,
  addFoodFailure,
  addFoodSuccess,
  addNewFood,
  deleteFoodSuccess,
  deleteFoodFailure,
  loadFood,
  loadFoodFailure,
  loadFoodSuccess,
  selectFood,
} from './food.actions';
export const foodFeatureKey = 'food';

export interface FoodState extends EntityState<FoodItem> {
  selected: FoodItem | null;
  loading: boolean;
  initialized: boolean;
}

export const foodAdapter: EntityAdapter<FoodItem> =
  createEntityAdapter<FoodItem>();

export const defaultFoodState: FoodState = {
  loading: false,
  initialized: false,
  ids: [],
  entities: {},
  selected: null,
};

export const initialState = foodAdapter.getInitialState(defaultFoodState);

export const foodReducer = createReducer(
  initialState,
  on(loadFood, (state) => {
    return { ...state, initialized: true };
  }),
  on(selectFood, (state, action) => {
    return { ...state, selected: action.food };
  }),
  on(addNewFood, (state) => {
    return {
      ...state,
      selected: {
        id: 0,
        name: '',
        amount: 1,
        code: '',
        date: new Date(),
        pictureUrl: '',
      },
    };
  }),
  on(loadFoodSuccess, (state, action) => {
    return foodAdapter.setAll(action.food, {
      ...state,
      loading: false,
    });
  }),
  on(loadFoodFailure, (state, action) => {
    console.log('loadFoodFailure', action.err);
    return { ...state, loading: false };
  }),
  on(addFoodSuccess, (state, action) => {
    return foodAdapter.addOne(action.food, {
      ...state,
      loading: false,
    });
  }),
  on(addFoodFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(updateFoodSuccess, (state, action) => {
    // TODO: Remove hack with food id
    return foodAdapter.updateOne(
      { id: action.food.id ?? 0, changes: action.food },
      {
        ...state,
        loading: false,
      }
    );
  }),
  on(updateFoodFailure, (state) => {
    return { ...state, loading: false };
  }),
  on(deleteFoodSuccess, (state, action) => {
    let id = action.food.id as number;
    return foodAdapter.removeOne(id, {
      ...state,
      loading: false,
      selected: null,
    });
  }),
  on(deleteFoodFailure, (state) => {
    return { ...state, loading: false };
  })
);
