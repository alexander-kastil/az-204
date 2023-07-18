import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CartFacade } from '../../state/cart/cart.facade';
import { Order } from '../order/order.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  fb = inject(FormBuilder);
  cart = inject(CartFacade);
  cartItems = this.cart.getItems();
  order = new Order();
  mockCheckout = new FormControl(false);
  total = this.cart.getSumTotal();

  checkoutForm = this.fb.group({
    customer: [this.order.customer, { validators: [Validators.required] }],
    email: [
      this.order.email,
      { validators: [Validators.email, Validators.required] },
    ],
    address: [this.order.address, { validators: [Validators.required] }],
    payment: [this.order.payment, { validators: [Validators.required] }],
    items: this.fb.array([]),
  });

  ngOnInit(): void {
    this.mockCheckout.valueChanges.pipe().subscribe((isMock) => {
      if (isMock) {
        this.order.customer = 'Alexander Pajer';
        this.order.email = 'alexander.pajer@integrations.at';
        this.order.address = 'Hauptstraße 1, Wien, Austria';
        this.order.payment = 'PayPal, abcd...';
        this.checkoutForm.patchValue(this.order);
      }
    });
  }

  completeCheckout() {
    this.cartItems.subscribe((items) => {
      this.order.items = items;
      this.cart.checkout(this.order);
    });
  }
}
