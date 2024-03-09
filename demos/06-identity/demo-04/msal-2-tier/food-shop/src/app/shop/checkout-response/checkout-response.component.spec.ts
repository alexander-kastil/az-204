import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutResponseComponent } from './checkout-response.component';

describe('CheckoutResponseComponent', () => {
  let component: CheckoutResponseComponent;
  let fixture: ComponentFixture<CheckoutResponseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutResponseComponent]
    });
    fixture = TestBed.createComponent(CheckoutResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
