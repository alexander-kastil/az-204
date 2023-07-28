import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmedComponent } from './checkout-confirmed.component';

describe('CheckoutConfirmedComponent', () => {
  let component: CheckoutConfirmedComponent;
  let fixture: ComponentFixture<CheckoutConfirmedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutConfirmedComponent]
    });
    fixture = TestBed.createComponent(CheckoutConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
