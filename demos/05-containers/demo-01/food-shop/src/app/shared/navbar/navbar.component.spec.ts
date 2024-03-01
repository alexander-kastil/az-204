import { waitForAsync } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let comp: NavbarComponent;
  let mf: any;

  beforeEach(waitForAsync(() => {
    mf = jasmine.createSpyObj('MenuFacade', ['toggleMenuVisibility']);
    comp = new NavbarComponent(mf);
  }));

  it('should have three menu items by default', () => {
    expect(comp.menuItems.length).toBe(3);
  });
});
