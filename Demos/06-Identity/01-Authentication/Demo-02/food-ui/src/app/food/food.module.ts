import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodListComponent } from './food-list/food-list.component';
import { FoodEditComponent } from './food-edit/food-edit.component';
import { FoodContainerComponent } from './food-container/food-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material.module';
import { FoodEffects } from './state/food.effects';
import { foodFeatureKey, foodReducer } from './state/food.reducer';

@NgModule({
  declarations: [FoodListComponent, FoodEditComponent, FoodContainerComponent],
  imports: [
    CommonModule,
    FoodRoutingModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    StoreModule.forFeature(foodFeatureKey, foodReducer),
    EffectsModule.forFeature([FoodEffects]),
  ],
})
export class FoodModule {}
