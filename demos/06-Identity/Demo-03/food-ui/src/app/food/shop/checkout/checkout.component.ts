import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartFacade } from '../../state/cart/cart.facade';
import { OrderItem } from './order-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  items = this.cart.getItems();
  order: OrderItem = new OrderItem();
  mockCheckout: FormControl = new FormControl(false);
  total = this.cart.getSumTotal();

  checkoutForm = this.fb.group({
    name: [this.order.name, { validators: [Validators.required] }],
    email: [
      this.order.email,
      { validators: [Validators.email, Validators.required] },
    ],
    address: [this.order.address, { validators: [Validators.required] }],
    payment: [this.order.payment, { validators: [Validators.required] }],
    items: this.fb.array([]),
  });

  constructor(private cart: CartFacade, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.mockCheckout.valueChanges.subscribe((isMock) => {
      if (isMock) {
        this.order.name = 'John Doe';
        this.order.email = 'alexander.pajer@integrations.at';
        this.order.address = '123 Main St';
        this.order.payment = 'PayPal, abcd...';
        this.checkoutForm.patchValue(this.order);
      }
    });
  }

  completeCheckout() {
    this.items.subscribe((items) => {
      this.order.items = items;
      this.cart.checkout(this.order);
    });
  }
}
