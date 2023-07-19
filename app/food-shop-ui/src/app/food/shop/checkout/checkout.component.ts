import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CartFacade } from '../../state/cart/cart.facade';
import { mockOrder } from '../../state/cart/mock-data';
import { Order } from '../order/order.model';
import { map } from 'rxjs';
import { combineLatestWith } from 'rxjs/operators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  fb = inject(FormBuilder);
  cart = inject(CartFacade);
  cartItems = this.cart.getItems();
  order: Order = new Order();
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

  constructor() {
    this.orderForm.patchValue(Object.assign(new Order(), mockOrder));
  }

  completeCheckout() {
    this.cartItems.pipe(
      combineLatestWith(this.total),
      map(([items, total]) => {
        const o = Object.assign(new Order(), this.orderForm.value, { items }, { Total: total }, { status: 'placed' })
        this.cart.checkout(o);
      })
    ).subscribe();
  }
}
