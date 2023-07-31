import { createFeature, createReducer, on } from '@ngrx/store';
import { SideNavActions } from './sidenav.actions';

export interface SidenavState {
  sideNavEnabled: boolean;
  sideNavVisible: boolean;
  sideNavPosition: string;
}

const initialState: SidenavState = {
  sideNavEnabled: true,
  sideNavVisible: true,
  sideNavPosition: 'side',
};

export const sidenavFeature = createFeature({
  name: 'sidenav',
  reducer: createReducer(
    initialState,
    on(SideNavActions.toggleSideNav, (state) => ({
      ...state,
      sideNavVisible: !state.sideNavVisible,
    })),
    on(SideNavActions.setSideNavEnabled, (state, action) => ({
      ...state,
      sideNavEnabled: action.enabled,
      sideNavVisible: action.enabled,
    })),
    on(SideNavActions.setSideNavVisible, (state, action) => ({
      ...state,
      sideNavVisible: action.visible,
    })),
    on(SideNavActions.setSideNavPosition, (state, action) => ({
      ...state,
      sideNavPosition: action.position,
    })))
});
