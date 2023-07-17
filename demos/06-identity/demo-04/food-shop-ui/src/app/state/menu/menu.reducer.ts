import { createReducer, on } from '@ngrx/store';
import { SideNavActions } from './menu.actions';

export interface MenuState {
  sideNavEnabled: boolean;
  sideNavVisible: boolean;
  sideNavPosition: string;
}

const initialState: MenuState = {
  sideNavEnabled: true,
  sideNavVisible: true,
  sideNavPosition: 'side',
};

export const reducer = createReducer(
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
  }))
);
