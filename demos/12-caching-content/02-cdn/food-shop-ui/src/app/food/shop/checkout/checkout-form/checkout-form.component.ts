import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { Order } from '../../order/order.model';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { CartItem } from '../../cart-item.model';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.scss']
})
export class CheckoutFormComponent {
  @Input({ required: true }) order: Order = new Order();
  @Output() onCheckout = new EventEmitter<Order>();

  fb = inject(FormBuilder);
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

  createOrderItems(items: CartItem[]) {
    let orderItems = this.orderForm.get('items') as FormArray;
    items.forEach(item => {
      orderItems.push(this.fb.group({
        itemId: [{ value: item.id, disabled: true }, { validators: [Validators.required] }],
        itemName: [{ value: item.name, disabled: true }, { validators: [Validators.required] }],
        itemPrice: [{ value: item.price, disabled: true }, { validators: [Validators.required] }],
        itemQuantity: [{ value: item.quantity, disabled: true }, { validators: [Validators.required] }],
      }));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order']) {
      console.log("changes: ", changes['order'].currentValue);
      this.orderForm.patchValue(changes['order'].currentValue);
      this.createOrderItems(this.order.items);
    }
  }

  completeCheckout() {
    const o = Object.assign({ ...this.order }, this.orderForm.value, { items: [...this.order.items] });
    console.log("checking out order: ", o);
    this.onCheckout.emit(o);
  }
}
