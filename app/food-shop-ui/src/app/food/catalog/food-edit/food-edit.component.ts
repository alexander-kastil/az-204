import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CatalogItem } from '../../food-catalog.model';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent implements OnChanges {
  @Input() food: CatalogItem = new CatalogItem();
  @Output() saveFood: EventEmitter<CatalogItem> = new EventEmitter();
  fb = inject(FormBuilder);
  form = this.fb.group({
    id: this.food.id,
    name: [this.food.name, [Validators.required, Validators.minLength(3)]],
    inStock: [this.food.inStock, [Validators.required, Validators.min(1)]],
    price: this.food.price,
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food']) {
      this.form.setValue(changes['food'].currentValue);
    }
  }

  saveForm(form: FormGroup) {
    this.saveFood.emit(form.value);
  }
}
