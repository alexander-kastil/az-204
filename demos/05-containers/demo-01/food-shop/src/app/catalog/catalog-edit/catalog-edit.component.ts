import { Component, EventEmitter, Input, Output, SimpleChanges, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CatalogItem } from '../catalog-item.model';

@Component({
  selector: 'app-catalog-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './catalog-edit.component.html',
  styleUrl: './catalog-edit.component.scss'
})
export class CatalogEditComponent {
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
