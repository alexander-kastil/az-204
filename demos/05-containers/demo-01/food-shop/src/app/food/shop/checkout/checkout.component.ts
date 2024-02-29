import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { CartFacade } from '../../state/cart/cart.facade';
import { mockOrder } from '../../state/cart/mock-data';
import { Order } from '../order/order.model';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';
import { NgIf } from '@angular/common';
import { OrdersService } from '../order/orders.service';
import { OrderEventResponse } from '../order/order-event-response';
import { CheckoutResponseComponent } from '../checkout-response/checkout-response.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [NgIf, CheckoutFormComponent, CheckoutResponseComponent],
})
export class CheckoutComponent {
  fb = inject(FormBuilder);
  cart = inject(CartFacade);
  os = inject(OrdersService)
  order: Order = new Order();
  response: OrderEventResponse | null = null

  constructor() {
    combineLatest([this.cart.getItems(), this.cart.getSumTotal()]).pipe(
      map(([items, total]) => {
        return Object.assign(new Order(), mockOrder, { items: [...items] },
          { total: total })
      })).subscribe(o => this.order = o);
  }

  completeCheckout(o: Order) {
    this.os.checkout(o).subscribe(orderResponse => {
      this.response = orderResponse
      this.cart.clear();
    });
  }
}