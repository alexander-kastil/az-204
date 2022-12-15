import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FoodItem } from '../food.model';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: 0,
      name: ['', [Validators.required, Validators.minLength(3)]],
      amount: [0],
      pictureUrl: '',
      code: '',
      date: new Date(),
    });
  }

  @Input() food: FoodItem;
  @Output() onSaveFood: EventEmitter<FoodItem> = new EventEmitter();
  @Output() onMailFood: EventEmitter<FoodItem> = new EventEmitter();

  form: FormGroup;

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['food']) {
      this.form.setValue(changes['food']?.currentValue);
    }
  }

  saveForm(form: FormGroup) {
    this.onSaveFood.emit(form.value);
  }
}
