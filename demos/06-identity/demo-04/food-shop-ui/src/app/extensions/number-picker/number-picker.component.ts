import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: NumberPickerComponent,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: NumberPickerComponent,
    },
  ],
})
export class NumberPickerComponent implements ControlValueAccessor, Validator {
  quantity = 0;

  @Input() increment: number = 1;

  @Output() amountChanged: EventEmitter<number> = new EventEmitter<number>();

  onChange = (quantity: number) => {
    console.log('onChange', quantity);
  };

  onTouched = () => {};

  touched = false;

  disabled = false;

  onAdd() {
    this.markAsTouched();
    if (!this.disabled) {
      this.quantity += this.increment;
      this.onChange(this.quantity);
      this.amountChanged.emit(this.quantity);
    }
  }

  onRemove() {
    this.markAsTouched();
    if (!this.disabled && this.quantity > 0) {
      this.quantity -= this.increment;
      this.onChange(this.quantity);
      this.amountChanged.emit(this.quantity);
    }
  }

  writeValue(quantity: number) {
    this.quantity = quantity;
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
      console.log('markAsTouched');
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const quantity = control.value;
    if (quantity <= 0) {
      return {
        mustBePositive: {
          quantity,
        },
      };
    }
    return null;
  }
}
