import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopItemComponent } from './shop-item.component';

describe('ShopItemComponent', () => {
  let component: ShopItemComponent;
  let fixture: ComponentFixture<ShopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
