import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodShopContaienerComponent } from './food-shop-container.component';

describe('FoodShopContaienerComponent', () => {
  let component: FoodShopContaienerComponent;
  let fixture: ComponentFixture<FoodShopContaienerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FoodShopContaienerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodShopContaienerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
