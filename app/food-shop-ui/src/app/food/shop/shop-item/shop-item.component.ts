import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodItem } from "../../food-item.model";
import { CartItem } from '../cart-item.model';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
})
export class ShopItemComponent {
  @Input() food: FoodItem = new FoodItem();
  @Input() inCart: number | null = 0;
  @Output() amountChange: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  nbrPicker: FormControl = new FormControl(this.inCart);

  constructor() { }

  ngOnChanges() {
    this.nbrPicker.setValue(this.inCart);
  }

  handleAmountChange(amount: number) {
    let ci: CartItem = {
      id: this.food.id,
      name: this.food.name,
      price: this.food.price,
      quantity: amount,
    };
    this.amountChange.emit(ci);
  }
}
