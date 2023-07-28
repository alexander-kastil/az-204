import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EuroPipe } from './euro.pipe';
import { NumberPickerComponent } from './number-picker/number-picker.component';

@NgModule({
  declarations: [EuroPipe, NumberPickerComponent],
  exports: [EuroPipe, NumberPickerComponent],
  imports: [CommonModule, MatIconModule],
})
export class UtilsModule {}
