import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const SideNavActions = createActionGroup({
  source: 'SideNav',
  events: {
    toggleSideNav: emptyProps(),
    setSideNavEnabled: props<{ enabled: boolean }>(),
    setSideNavVisible: props<{ visible: boolean }>(),
    setSideNavPosition: props<{ position: string }>(),
  },
});
