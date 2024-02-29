import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodShopContainerComponent } from './food-shop-container.component';

describe('FoodShopContaienerComponent', () => {
  let component: FoodShopContainerComponent;
  let fixture: ComponentFixture<FoodShopContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FoodShopContainerComponent],
}).compileComponents();

    fixture = TestBed.createComponent(FoodShopContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
