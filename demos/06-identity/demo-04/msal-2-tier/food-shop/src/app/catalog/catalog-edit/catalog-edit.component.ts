import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FoodEntityService } from '../state/food-entity.service';
import { CommandRowDirective } from 'src/app/shared/formatting/formatting-directives';
import { Router, RouterLink } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-catalog-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    JsonPipe,
    CommandRowDirective
  ],
  templateUrl: './catalog-edit.component.html',
  styleUrl: './catalog-edit.component.scss'
})
export class CatalogEditComponent {
  service = inject(FoodEntityService);
  fb = inject(FormBuilder);
  router = inject(Router);
  id = input.required<number>();

  form = this.fb.group({
    id: 0,
    name: ["", [Validators.required, Validators.minLength(3)]],
    inStock: [0, [Validators.required, Validators.min(1)]],
    price: 0,
    description: [""],
    code: [""],
    pictureUrl: [""]
  });

  constructor() {
    effect(() => {
      if (this.id() != 0) {
        this.service.getByKey(this.id()).subscribe((f) => {
          console.log(f);
          if (f) {
            this.form.setValue(f);
          }
        });
      }
    }, { allowSignalWrites: true });
  }

  saveForm(form: FormGroup) {
    if (this.id() != 0) {
      this.service.update(form.value).subscribe(() => {
        this.router.navigate(["/catalog"]);
      });
    } else {
      this.service.add(form.value).subscribe(() => {
        this.router.navigate(["/catalog"]);
      });
    }
  }
}
