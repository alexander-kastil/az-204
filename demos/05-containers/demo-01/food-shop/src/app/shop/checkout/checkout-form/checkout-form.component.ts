
import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { BorderDirective, CommandRowDirective, ColumnDirective } from 'src/app/shared/formatting/formatting-directives';
import { EuroPipe } from 'src/app/shared/pipes/euro.pipe';
import { CartItem } from '../../cart-item.model';
import { Order } from '../../order/order.model';

@Component({
    selector: 'app-checkout-form',
    templateUrl: './checkout-form.component.html',
    styleUrls: ['./checkout-form.component.scss'],
    imports: [
        MatToolbarModule,
        ReactiveFormsModule,
        RouterLink,
        BorderDirective,
        ColumnDirective,
        CommandRowDirective,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        EuroPipe,
    ]
})
export class CheckoutFormComponent {
  @Input({ required: true }) order: Order = new Order();
  @Output() onCheckout = new EventEmitter<Order>();

  fb = inject(FormBuilder);
  orderForm = this.fb.group(
    {
      customer: this.fb.group({
        id: [{ value: this.order.customer.id }, { validators: [Validators.required] }],
        name: [this.order.customer.name, { validators: [Validators.required] }],
        email: [
          this.order.customer.email,
          { validators: [Validators.email, Validators.required] },
        ],
        phone: [this.order.customer.phone, { validators: [Validators.required] }],
      }),
      shippingAddress: this.fb.group({
        street: [this.order.shippingAddress.street, { validators: [Validators.required] }],
        city: [this.order.shippingAddress.city, { validators: [Validators.required] }],
        country: [this.order.shippingAddress.country, { validators: [Validators.required] }],
        zipCode: [this.order.shippingAddress.zipCode, { validators: [Validators.required] }],
      }),
      payment: this.fb.group({
        type: [this.order.payment.type, { validators: [Validators.required] }],
        accountNumber: [this.order.payment.accountNumber, { validators: [Validators.required] }]
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
      this.orderForm.patchValue(changes['order'].currentValue);
      this.createOrderItems(this.order.items);
    }
  }

  completeCheckout() {
    const o = Object.assign({ ...this.order }, this.orderForm.value, { items: [...this.order.items] });
    this.onCheckout.emit(o);
  }
}
