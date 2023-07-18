import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, NgForm, Validators } from '@angular/forms';
import { CartFacade } from '../../state/cart/cart.facade';
import { Order } from '../order/order.model';
import { mockCustomer } from './mock-data';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  fb = inject(FormBuilder);
  cart = inject(CartFacade);
  cartItems = this.cart.getItems();
  order = mockCustomer;
  mockCheckout = new FormControl(false);
  total = this.cart.getSumTotal();

  orderForm = this.fb.group(
    {
      customer: this.fb.group({
        name: [this.order.customer.name, { validators: [Validators.required] }],
        email: [
          this.order.customer.email,
          { validators: [Validators.email, Validators.required] },
        ],
        address: [this.order.customer.address, { validators: [Validators.required] }],
      }),
      payment: this.fb.group({
        type: [this.order.payment.type, { validators: [Validators.required] }],
        account: [this.order.payment.account, { validators: [Validators.required] }]
      }),
      items: this.fb.array([]),
    });

  ngOnInit(): void {
    this.mockCheckout.valueChanges.pipe().subscribe((isMock) => {
      if (isMock) {
        this.order = mockCustomer;
        console.log('Mocking checkout');
        this.orderForm.patchValue(this.order);
      }
    });
  }

  completeCheckout() {
    console.log('Completing checkout', this.orderForm.value);
    // this.cartItems.subscribe((items) => {
    //   this.order.items = items;
    //   this.cart.checkout(this.order);
    // });
  }
}
