import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromMenu from './menu/menu.reducer';

export interface State {
  menu: fromMenu.MenuState;
  // food: FoodState; -> from lazy loaded module
}

export const reducers: ActionReducerMap<State> = {
  menu: fromMenu.reducer,
  // food: foodReducer; -> from lazy loaded module
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? []
  : [];
