import { Component, EventEmitter, Output, effect, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NumberPickerComponent } from 'src/app/shared/number-picker/number-picker.component';
import { CatalogItem } from '../../catalog/catalog-item.model';
import { CartItem } from '../cart-item.model';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss'],
  imports: [
    MatCardModule,
    NumberPickerComponent,
    ReactiveFormsModule
  ]
})
export class ShopItemComponent {
  food = input<CatalogItem>(new CatalogItem());
  inCart = input<number>(0);
  @Output() amountChange: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  nbrPicker = new FormControl(this.inCart());

  constructor() {
    effect(() => {
      this.nbrPicker.setValue(this.inCart());
    });
  }

  handleAmountChange(amount: number) {
    let ci: CartItem = {
      id: this.food().id,
      name: this.food().name,
      price: this.food().price,
      quantity: amount,
    };
    this.amountChange.emit(ci);
  }
}
